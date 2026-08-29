/** Clamped 0–100 — derive a progress percentage from a value/goal pair rather than hardcoding it. */
export function calculateProgress(value: number, goal: number): number {
  return Math.min(100, Math.round((value / goal) * 100));
}
