export function formatPrice({
  price = 0,
  locale,
  currency,
}: {
  price?: number;
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

export function getMediaArray({ property }: { property?: Property }): string[] {
  return property?.['Media-Foto'] || [];
}

export function calculatePricePerSquareMeter({
  price,
  area,
}: {
  price?: number;
  area?: number;
}): number {
  if (!price || !area || area === 0) {
    return 0;
  }

  return price / area;
}

export function getPropertyLocation({
  property,
}: {
  property?: Property;
}): [number, number] {
  // Return the coordinates as [latitude, longitude]
  return [property?.WGS84_Y || 0, property?.WGS84_X || 0];
}
