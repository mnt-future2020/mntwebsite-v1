import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

function dayStart(s: string) {
  const d = new Date(s);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function POST(req: Request) {
  try {
    const { date, records } = await req.json();
    if (!date || !Array.isArray(records)) {
      return NextResponse.json({ error: "Date and records are required." }, { status: 400 });
    }
    const day = dayStart(date);
    await prisma.$transaction(
      records.map((r: Record<string, unknown>) =>
        prisma.attendance.upsert({
          where: { employeeId_date: { employeeId: String(r.employeeId), date: day } },
          update: {
            status: String(r.status || "PRESENT") as never,
            checkIn: (r.checkIn as string) || null,
            checkOut: (r.checkOut as string) || null,
            lateMinutes: Number(r.lateMinutes) || 0,
            note: (r.note as string) || null,
          },
          create: {
            employeeId: String(r.employeeId),
            date: day,
            status: String(r.status || "PRESENT") as never,
            checkIn: (r.checkIn as string) || null,
            checkOut: (r.checkOut as string) || null,
            lateMinutes: Number(r.lateMinutes) || 0,
            note: (r.note as string) || null,
          },
        })
      )
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Couldn't save attendance." }, { status: 500 });
  }
}
