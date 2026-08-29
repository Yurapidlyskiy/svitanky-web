export function formatAmount(value: number): string {
  return new Intl.NumberFormat('uk-UA').format(value);
}
