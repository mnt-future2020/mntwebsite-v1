import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

// The signed-in employee (null for the env super-admin or when DB is down).
export async function getCurrentEmployee() {
  const session = await getSession();
  if (!session || session.sub === "admin") return null;
  try {
    return await prisma.employee.findUnique({ where: { id: session.sub } });
  } catch {
    return null;
  }
}
