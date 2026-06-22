// Shared parser: form body → Prisma Employee data.
export function parseEmployee(b: Record<string, unknown>) {
  const d = (s: unknown) => (s ? new Date(String(s)) : null);
  const i = (n: unknown) => {
    const v = parseInt(String(n ?? ""), 10);
    return Number.isFinite(v) ? v : 0;
  };
  const f = (n: unknown) => {
    const v = parseFloat(String(n ?? ""));
    return Number.isFinite(v) ? v : 0;
  };
  return {
    firstName: String(b.firstName || "").trim(),
    lastName: (b.lastName as string) || null,
    email: String(b.email || "").trim(),
    phone: (b.phone as string) || null,
    photoUrl: (b.photoUrl as string) || null,
    departmentId: (b.departmentId as string) || null,
    designation: (b.designation as string) || null,
    level: (b.level as string) || null,
    employmentType: (b.employmentType as string) || "FULL_TIME",
    status: (b.status as string) || "PROBATION",
    role: (b.role as string) || "EMPLOYEE",
    managerId: (b.managerId as string) || null,
    joinDate: d(b.joinDate) || new Date(),
    probationEndDate: d(b.probationEndDate),
    confirmationDate: d(b.confirmationDate),
    exitDate: d(b.exitDate),
    dob: d(b.dob),
    gender: (b.gender as string) || null,
    address: (b.address as string) || null,
    emergencyName: (b.emergencyName as string) || null,
    emergencyPhone: (b.emergencyPhone as string) || null,
    pan: (b.pan as string) || null,
    bankName: (b.bankName as string) || null,
    bankAccount: (b.bankAccount as string) || null,
    ifsc: (b.ifsc as string) || null,
    ctcAnnual: b.ctcAnnual ? i(b.ctcAnnual) : null,
    basic: i(b.basic),
    hra: i(b.hra),
    allowances: i(b.allowances),
    paidLeaveBalance: f(b.paidLeaveBalance),
    casualBalance: f(b.casualBalance),
    sickBalance: f(b.sickBalance),
    compOffBalance: f(b.compOffBalance),
    notes: (b.notes as string) || null,
  };
}
