import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getOrgSettings } from "@/lib/org";

export const runtime = "nodejs";

export async function GET() {
  const s = await getOrgSettings();
  return NextResponse.json(s);
}

export async function PUT(req: Request) {
  try {
    const b = await req.json();
    const num = (v: unknown) => {
      const n = parseFloat(String(v ?? ""));
      return Number.isFinite(n) ? n : null;
    };
    const radius = parseInt(String(b.geofenceRadiusM ?? 50), 10);
    const pct = (v: unknown, fallback: number) => {
      const n = parseFloat(String(v ?? ""));
      return Number.isFinite(n) ? Math.min(100, Math.max(0, n)) : fallback;
    };
    const days = (v: unknown, fallback: number) => {
      const n = parseFloat(String(v ?? ""));
      return Number.isFinite(n) && n >= 0 ? n : fallback;
    };
    const str = (v: unknown) => {
      const s = String(v ?? "").trim();
      return s || null;
    };
    const data = {
      officeLat: num(b.officeLat),
      officeLng: num(b.officeLng),
      geofenceRadiusM: Number.isFinite(radius) && radius > 0 ? radius : 50,
      workStart: String(b.workStart || "09:30"),
      workEnd: String(b.workEnd || "18:30"),
      scanEnabled: Boolean(b.scanEnabled),
      salaryBasicPct: pct(b.salaryBasicPct, 50),
      salaryHraPctOfBasic: pct(b.salaryHraPctOfBasic, 50),
      annualPaidLeave: days(b.annualPaidLeave, 12),
      annualCasualLeave: days(b.annualCasualLeave, 12),
      annualSickLeave: days(b.annualSickLeave, 12),
      annualCompOff: days(b.annualCompOff, 0),
      spacesRegion: str(b.spacesRegion),
      spacesBucket: str(b.spacesBucket),
      spacesKey: str(b.spacesKey),
      spacesEndpoint: str(b.spacesEndpoint),
    };
    // Secret is write-only: only overwrite it when a new value is actually sent
    // (a blank field keeps the existing secret).
    const secretUpdate =
      typeof b.spacesSecret === "string" && b.spacesSecret.trim()
        ? { spacesSecret: b.spacesSecret.trim() }
        : {};
    const saved = await prisma.orgSetting.upsert({
      where: { id: 1 },
      update: { ...data, ...secretUpdate },
      create: { id: 1, ...data, ...secretUpdate },
    });
    // Never return the secret to the client.
    return NextResponse.json({ ...saved, spacesSecret: undefined });
  } catch {
    return NextResponse.json({ error: "Save failed — is the database connected?" }, { status: 500 });
  }
}
