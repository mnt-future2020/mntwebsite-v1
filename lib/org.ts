import { prisma } from "@/lib/db";

export type OrgSettings = {
  officeLat: number | null;
  officeLng: number | null;
  geofenceRadiusM: number;
  workStart: string;
  workEnd: string;
  scanEnabled: boolean;
  salaryBasicPct: number;
  salaryHraPctOfBasic: number;
  annualPaidLeave: number;
  annualCasualLeave: number;
  annualSickLeave: number;
  annualCompOff: number;
};

export const DEFAULT_ORG: OrgSettings = {
  officeLat: null,
  officeLng: null,
  geofenceRadiusM: 50,
  workStart: "09:30",
  workEnd: "19:30",
  scanEnabled: true,
  salaryBasicPct: 50,
  salaryHraPctOfBasic: 50,
  annualPaidLeave: 12,
  annualCasualLeave: 12,
  annualSickLeave: 12,
  annualCompOff: 0,
};

// Single-row (id = 1) org settings. Degrades to defaults when DB is absent.
export async function getOrgSettings(): Promise<OrgSettings> {
  try {
    const s = await prisma.orgSetting.findUnique({ where: { id: 1 } });
    if (!s) return DEFAULT_ORG;
    return {
      officeLat: s.officeLat,
      officeLng: s.officeLng,
      geofenceRadiusM: s.geofenceRadiusM,
      workStart: s.workStart,
      workEnd: s.workEnd,
      scanEnabled: s.scanEnabled,
      salaryBasicPct: s.salaryBasicPct,
      salaryHraPctOfBasic: s.salaryHraPctOfBasic,
      annualPaidLeave: s.annualPaidLeave,
      annualCasualLeave: s.annualCasualLeave,
      annualSickLeave: s.annualSickLeave,
      annualCompOff: s.annualCompOff,
    };
  } catch {
    return DEFAULT_ORG;
  }
}

// Great-circle distance in metres (Haversine).
export function distanceM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Punch labels + the punch state-machine moved to lib/attendance.ts (prisma-free
// so it can be shared with client components like ScanPanel).
