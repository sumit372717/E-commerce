/**
 * Central place for currency formatting.
 * Change the symbol/locale here and it updates everywhere prices are shown.
 */
export function formatPrice(amount: number): string {
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `৳${formatted}`;
}
