/** `2026-07-20` → `20.07.2026`. Pure string maths — no timezone can shift the day. */
export function formatPostDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return year && month && day ? `${day}.${month}.${year}` : isoDate;
}

/** Today's date in Kyiv as `YYYY-MM-DD`, the value an `<input type="date">` expects. */
export function todayInKyiv(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv' }).format(now);
}
