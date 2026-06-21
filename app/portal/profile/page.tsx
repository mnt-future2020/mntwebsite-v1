import { getCurrentEmployee } from "@/lib/portal";
import { fullName, fmtDate } from "@/lib/hr";

export const dynamic = "force-dynamic";

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-50 py-2.5 text-sm last:border-0">
      <span className="text-slatey">{label}</span>
      <span className="text-right font-medium text-ink">{value || "—"}</span>
    </div>
  );
}

export default async function PortalProfilePage() {
  const emp = await getCurrentEmployee();
  if (!emp) {
    return (
      <>
        <h1 className="text-2xl font-bold text-ink">Profile</h1>
        <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          No employee profile linked to this account.
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ink">Profile</h1>
      <p className="mt-1 mb-6 text-sm text-slatey">Your details on record. Contact HR to update anything.</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-ink">Identity</h2>
          <div className="mt-3">
            <Row label="Name" value={fullName(emp)} />
            <Row label="Employee code" value={emp.code} />
            <Row label="Email" value={emp.email} />
            <Row label="Phone" value={emp.phone} />
            <Row label="Date of birth" value={emp.dob ? fmtDate(emp.dob) : null} />
            <Row label="Gender" value={emp.gender} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-ink">Job</h2>
          <div className="mt-3">
            <Row label="Designation" value={emp.designation} />
            <Row label="Level" value={emp.level} />
            <Row label="Employment type" value={emp.employmentType?.replace("_", " ")} />
            <Row label="Status" value={emp.status} />
            <Row label="Joined" value={fmtDate(emp.joinDate)} />
            <Row label="Access role" value={emp.role} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-ink">Emergency contact</h2>
          <div className="mt-3">
            <Row label="Name" value={emp.emergencyName} />
            <Row label="Phone" value={emp.emergencyPhone} />
            <Row label="Address" value={emp.address} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-ink">Bank &amp; statutory</h2>
          <div className="mt-3">
            <Row label="Bank" value={emp.bankName} />
            <Row label="Account" value={emp.bankAccount} />
            <Row label="IFSC" value={emp.ifsc} />
            <Row label="PAN" value={emp.pan} />
          </div>
        </div>
      </div>
    </>
  );
}
