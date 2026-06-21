import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import {
  ALL_KEYS,
  SYSTEM_ROLE_KEYS,
  isSystemRole,
  roleKeyFromLabel,
} from "@/lib/permissions";
import { listRoles } from "@/lib/permissions-db";

export const runtime = "nodejs";

async function isAdmin() {
  const session = await getSession();
  return !!session && session.role === "ADMIN";
}

const cleanPerms = (arr: unknown): string[] =>
  Array.isArray(arr)
    ? (arr as unknown[]).filter((k): k is string => typeof k === "string" && ALL_KEYS.includes(k))
    : [];

// List every role (built-in + custom).
export async function GET() {
  return NextResponse.json(await listRoles());
}

// Save the access matrix — perms (and labels) for every editable role.
export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Only an admin can change role access." }, { status: 403 });
  }
  try {
    const body = await req.json();
    const roles: { key?: string; label?: string; perms?: unknown }[] = Array.isArray(body?.roles) ? body.roles : [];
    for (const r of roles) {
      const key = String(r.key || "");
      if (!key || key === "ADMIN") continue; // admin is always all-access, never stored
      const sys = isSystemRole(key);
      const label = String(r.label || key).trim() || key;
      const perms = cleanPerms(r.perms);
      await prisma.roleAccess.upsert({
        where: { role: key },
        update: { perms, label, isSystem: sys },
        create: { role: key, label, perms, isSystem: sys },
      });
    }
    return NextResponse.json(await listRoles());
  } catch {
    return NextResponse.json({ error: "Couldn't save — is the database connected?" }, { status: 500 });
  }
}

// Create a new custom role.
export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Only an admin can create roles." }, { status: 403 });
  }
  try {
    const body = await req.json();
    const label = String(body?.name || "").trim();
    if (!label) return NextResponse.json({ error: "Give the role a name." }, { status: 400 });

    const key = roleKeyFromLabel(label);
    if (!key) return NextResponse.json({ error: "Use letters or numbers in the name." }, { status: 400 });
    if (SYSTEM_ROLE_KEYS.includes(key) || SYSTEM_ROLE_KEYS.includes(key.toUpperCase())) {
      return NextResponse.json({ error: "That name clashes with a built-in role." }, { status: 409 });
    }
    const existing = await prisma.roleAccess.findUnique({ where: { role: key } });
    if (existing) return NextResponse.json({ error: "A role with that name already exists." }, { status: 409 });

    await prisma.roleAccess.create({ data: { role: key, label, perms: [], isSystem: false } });
    return NextResponse.json(await listRoles(), { status: 201 });
  } catch {
    return NextResponse.json({ error: "Couldn't create the role — is the database connected?" }, { status: 500 });
  }
}

// Delete a custom role (blocked for built-ins and for roles still in use).
export async function DELETE(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Only an admin can delete roles." }, { status: 403 });
  }
  try {
    const key = new URL(req.url).searchParams.get("role") || "";
    if (!key) return NextResponse.json({ error: "Which role?" }, { status: 400 });
    if (isSystemRole(key)) return NextResponse.json({ error: "Built-in roles can't be deleted." }, { status: 400 });

    const inUse = await prisma.employee.count({ where: { role: key } });
    if (inUse > 0) {
      return NextResponse.json(
        { error: `Still used by ${inUse} employee${inUse === 1 ? "" : "s"}. Reassign them first.` },
        { status: 409 }
      );
    }
    await prisma.roleAccess.deleteMany({ where: { role: key } });
    return NextResponse.json(await listRoles());
  } catch {
    return NextResponse.json({ error: "Couldn't delete the role — is the database connected?" }, { status: 500 });
  }
}
