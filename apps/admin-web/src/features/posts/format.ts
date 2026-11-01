/** `2026-07-20` → `20.07.2026`. Pure string maths — no timezone can shift the day. */
export function formatPostDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return year && month && day ? `${day}.${month}.${year}` : isoDate;
}

/** Today's date in Kyiv as `YYYY-MM-DD`, the value an `<input type="date">` expects. */
export function todayInKyiv(now = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Kyiv' }).format(now);
}

/** Groups thousands the way the site does: `1 250 000`. */
export function formatAmount(value: number): string {
  return new Intl.NumberFormat('uk').format(value);
}

/** Clamped 0–100. An unfinished draft has a goal of 0, which is simply no progress. */
export function projectProgress(raised: number, goal: number): number {
  return goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
}

/** A draft's amount input as a number, for the live preview. The server re-validates on submit. */
export function parseAmountInput(value: string): number {
  const amount = Number(value.replace(/\s/g, ''));
  return Number.isSafeInteger(amount) && amount > 0 ? amount : 0;
}
