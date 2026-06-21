import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { computePayslip } from "@/lib/hr";

export const runtime = "nodejs";

const num = (v: unknown) => {
  const n = parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : 0;
};
const fnum = (v: unknown) => {
  const n = parseFloat(String(v ?? ""));
  return Number.isFinite(n) ? n : 0;
};

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.employeeId || !b.month || !b.year) {
      return NextResponse.json({ error: "Employee, month and year are required." }, { status: 400 });
    }
    const comp = {
      basic: num(b.basic),
      hra: num(b.hra),
      allowances: num(b.allowances),
      otherEarnings: num(b.otherEarnings),
      pf: num(b.pf),
      esi: num(b.esi),
      professionalTax: num(b.professionalTax),
      tds: num(b.tds),
      otherDeductions: num(b.otherDeductions),
      lopDays: fnum(b.lopDays),
    };
    const { gross, totalDeductions, net } = computePayslip(comp);
    const data = { ...comp, gross, totalDeductions, net, notes: b.notes || null };
    const slip = await prisma.payslip.upsert({
      where: { employeeId_month_year: { employeeId: b.employeeId, month: num(b.month), year: num(b.year) } },
      update: data,
      create: { employeeId: b.employeeId, month: num(b.month), year: num(b.year), ...data },
    });
    return NextResponse.json(slip);
  } catch {
    return NextResponse.json({ error: "Couldn't generate payslip." }, { status: 500 });
  }
}
