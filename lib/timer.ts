// Helpers for the start/stop task timer. A "running" timer is just a TimeEntry
// row with startedAt set and endedAt still null — see app/api/portal/time/{start,stop,active}.

// UTC-midnight of the IST calendar day that `d` falls on. Stored as TimeEntry.date
// so a timer entry renders on the same day as manual entries (which use the same
// representation), regardless of the viewer's timezone — and so a timer started
// just before IST midnight is filed under the correct day.
export function istDayDate(d: Date): Date {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(d); // YYYY-MM-DD
  return new Date(`${day}T00:00:00.000Z`);
}

// Elapsed hours between two instants, rounded to 2 decimals and clamped to a small
// minimum so even a quick start→stop logs > 0 (the timesheet rejects hours <= 0).
export function elapsedHours(start: Date, end: Date): number {
  const ms = Math.max(0, end.getTime() - start.getTime());
  return Math.max(0.01, Math.round((ms / 3_600_000) * 100) / 100);
}
