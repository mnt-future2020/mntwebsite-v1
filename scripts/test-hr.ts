// Throwaway unit tests for the pure HR helpers (no DB/UI needed).
// Run: npx tsx scripts/test-hr.ts
import { breakdownSalary, balanceFieldForKind, computePayslip, leaveDays } from "../lib/hr";

let pass = 0;
let fail = 0;
function eq(label: string, got: unknown, want: unknown) {
  const g = JSON.stringify(got);
  const w = JSON.stringify(want);
  if (g === w) { pass++; console.log(`  ✓ ${label}`); }
  else { fail++; console.log(`  ✗ ${label}\n      got:  ${g}\n      want: ${w}`); }
}

console.log("breakdownSalary");
eq("50000 @ 50/50", breakdownSalary(50000, { basicPct: 50, hraPctOfBasic: 50 }),
  { basic: 25000, hra: 12500, allowances: 12500, gross: 50000, ctcAnnual: 600000 });
eq("50000 @ 40/50", breakdownSalary(50000, { basicPct: 40, hraPctOfBasic: 50 }),
  { basic: 20000, hra: 10000, allowances: 20000, gross: 50000, ctcAnnual: 600000 });
eq("50000 @ 50/40 (non-metro)", breakdownSalary(50000, { basicPct: 50, hraPctOfBasic: 40 }),
  { basic: 25000, hra: 10000, allowances: 15000, gross: 50000, ctcAnnual: 600000 });
// Odd number: allowance must be the balance so parts sum EXACTLY to gross (no drift).
{
  const b = breakdownSalary(33333, { basicPct: 50, hraPctOfBasic: 50 });
  eq("33333 parts sum to gross", b.basic + b.hra + b.allowances, 33333);
}
eq("0 → all zero", breakdownSalary(0, { basicPct: 50, hraPctOfBasic: 50 }),
  { basic: 0, hra: 0, allowances: 0, gross: 0, ctcAnnual: 0 });
eq("negative clamps to 0", breakdownSalary(-100, { basicPct: 50, hraPctOfBasic: 50 }).gross, 0);

console.log("balanceFieldForKind");
eq("PAID", balanceFieldForKind("PAID"), "paidLeaveBalance");
eq("CASUAL", balanceFieldForKind("CASUAL"), "casualBalance");
eq("SICK", balanceFieldForKind("SICK"), "sickBalance");
eq("COMP_OFF", balanceFieldForKind("COMP_OFF"), "compOffBalance");
eq("UNPAID → null", balanceFieldForKind("UNPAID"), null);
eq("garbage → null", balanceFieldForKind("WHATEVER"), null);

console.log("computePayslip");
eq("gross & net (no PF/ESI)", computePayslip({
  basic: 25000, hra: 12500, allowances: 12500, otherEarnings: 0,
  pf: 0, esi: 0, professionalTax: 200, tds: 0, otherDeductions: 0, lopDays: 0,
}), { gross: 50000, lop: 0, totalDeductions: 200, net: 49800 });
{
  const p = computePayslip({ basic: 30000, hra: 0, allowances: 0, otherEarnings: 0,
    pf: 0, esi: 0, professionalTax: 0, tds: 0, otherDeductions: 0, lopDays: 3 });
  eq("LOP 3 days of 30000/30", p.lop, 3000);
  eq("net after LOP", p.net, 27000);
}

console.log("leaveDays");
eq("same day = 1", leaveDays("2026-06-10", "2026-06-10"), 1);
eq("inclusive range", leaveDays("2026-06-10", "2026-06-12"), 3);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
