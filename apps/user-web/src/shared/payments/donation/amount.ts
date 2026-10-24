import { DONATION_LIMITS } from '@/shared/config/support';

/** Whole hryvnias only: digits, no sign, no decimals, no exponent ("1e3" is not a donation). */
export function parseWholeAmount(raw: string | null | undefined): number | null {
  const text = raw?.trim() ?? '';

  return /^\d{1,7}$/.test(text) ? Number(text) : null;
}

export function isAllowedAmount(amount: number | null): amount is number {
  return amount !== null && amount >= DONATION_LIMITS.min && amount <= DONATION_LIMITS.max;
}
