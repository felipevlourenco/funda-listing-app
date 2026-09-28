export function formatPrice({
  price,
  locale,
  currency,
}: {
  price: number;
  locale: string;
  currency: string;
}): string {
  return price.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
