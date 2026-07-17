import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import PerformanceManager from "@/components/admin/hr/PerformanceManager";
import { fullName } from "@/lib/hr";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [reviews, employees] = await Promise.all([
      prisma.performanceReview.findMany({ orderBy: { createdAt: "desc" }, include: { employee: true }, take: 100 }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { reviews, employees };
  } catch {
    return null;
  }
}

export default async function PerformancePage() {
  const data = await getData();
  return (
    <>
      <PageHeader title="Performance" subtitle="Appraisals, ratings and hikes — MnT Future runs reviews on performance, not the calendar." />
      {data === null ? (
        <DbNotice />
      ) : data.employees.length === 0 ? (
        <Empty icon="users" title="No employees yet" body="Add employees first to record reviews." />
      ) : (
        <PerformanceManager
          reviews={data.reviews.map((r) => ({ id: r.id, employeeId: r.employeeId, employeeName: fullName(r.employee), period: r.period, rating: r.rating, hikePercent: r.hikePercent, reviewer: r.reviewer, status: r.status }))}
          employees={data.employees.map((e) => ({ id: e.id, name: fullName(e) }))}
        />
      )}
    </>
  );
}
