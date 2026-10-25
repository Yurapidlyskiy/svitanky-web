/** The fund and WayForPay both keep their calendar in Kyiv time. */
const TIME_ZONE = 'Europe/Kyiv';

/**
 * A monthly donor is billed on the day of the month they started on, but never later than
 * the 28th: every month has that day, so the schedule cannot drift or skip a month.
 */
export const MAX_BILLING_DAY = 28;

export type CalendarDate = { day: number; month: number; year: number };

const kyivDate = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  timeZone: TIME_ZONE,
  year: 'numeric',
});

function kyivToday(now: Date): CalendarDate {
  const parts = kyivDate.formatToParts(now);
  const read = (type: Intl.DateTimeFormatPartTypes): number => {
    const value = Number(parts.find((part) => part.type === type)?.value);

    if (!Number.isInteger(value))
      throw new Error(`Could not read the ${type} of ${now.toISOString()}`);

    return value;
  };

  return { day: read('day'), month: read('month'), year: read('year') };
}

/** The day of the month on which a monthly donor who starts at `now` is billed. */
export function billingDay(now: Date): number {
  return Math.min(kyivToday(now).day, MAX_BILLING_DAY);
}

/** The first automatic charge of a monthly donation: the billing day of the next month. */
export function nextChargeDate(now: Date): CalendarDate {
  const today = kyivToday(now);
  const isDecember = today.month === 12;

  return {
    day: Math.min(today.day, MAX_BILLING_DAY),
    month: isDecember ? 1 : today.month + 1,
    year: isDecember ? today.year + 1 : today.year,
  };
}

/**
 * How long a monthly donation runs. WayForPay wants an end date for every regular payment and
 * its payment page defaults it to the first charge, which would stop a donation after one
 * repeat. Ten years reads as "until the donor cancels", which they can do at any time.
 */
export const REGULAR_PAYMENT_YEARS = 10;

/** The last automatic charge of a monthly donation, ten years after the first. */
export function lastChargeDate(first: CalendarDate): CalendarDate {
  // The billing day is never past the 28th, so the same day exists in every month of every year.
  return { ...first, year: first.year + REGULAR_PAYMENT_YEARS };
}

/** DD.MM.YYYY, the format WayForPay expects in `dateNext` and `dateEnd`. */
export function formatChargeDate({ day, month, year }: CalendarDate): string {
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
}
