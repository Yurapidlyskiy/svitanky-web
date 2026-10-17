/** Groups thousands the way the visitor's language does (`1 250 000` in Ukrainian). */
export function formatAmount(value: number, locale: string): string {
  return new Intl.NumberFormat(locale).format(value);
}
