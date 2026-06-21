import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { nextProjectCode } from "@/lib/projects";

export const runtime = "nodejs";

function parseProject(b: Record<string, unknown>) {
  const d = (s: unknown) => (s ? new Date(String(s)) : null);
  const i = (n: unknown) => {
    const v = parseInt(String(n ?? ""), 10);
    return Number.isFinite(v) ? v : 0;
  };
  const stack = Array.isArray(b.techStack)
    ? (b.techStack as string[])
    : String(b.techStack || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
  return {
    name: String(b.name || "").trim(),
    description: (b.description as string) || null,
    clientId: (b.clientId as string) || null,
    status: (b.status as string) || "DISCOVERY",
    billingType: (b.billingType as string) || "FIXED",
    budget: i(b.budget),
    currency: (b.currency as string) || "INR",
    hourlyRate: i(b.hourlyRate),
    techStack: stack,
    repoUrl: (b.repoUrl as string) || null,
    startDate: d(b.startDate),
    endDate: d(b.endDate),
    leadId: (b.leadId as string) || null,
  };
}

export async function GET() {
  try {
    const list = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        client: true,
        lead: true,
        _count: { select: { tasks: true, members: true } },
      },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const data = parseProject(await req.json());
    if (!data.name) return NextResponse.json({ error: "Project name is required." }, { status: 400 });
    const count = await prisma.project.count();
    const p = await prisma.project.create({
      data: {
        ...data,
        code: nextProjectCode(count),
        status: data.status as never,
        billingType: data.billingType as never,
      },
    });
    return NextResponse.json(p);
  } catch {
    return NextResponse.json({ error: "Couldn't create the project." }, { status: 500 });
  }
}
