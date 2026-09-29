import type { SortBy } from '~/types';

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

export function sortProperties({
  properties,
  sortBy,
}: {
  properties: PropertyObject[];
  sortBy: SortBy;
}): PropertyObject[] {
  const sortedProperties = [...properties];

  switch (sortBy) {
    case 'priceAsc':
      return sortedProperties.sort(
        (a, b) => a.Prijs.Koopprijs - b.Prijs.Koopprijs,
      );
    case 'priceDesc':
      return sortedProperties.sort(
        (a, b) => b.Prijs.Koopprijs - a.Prijs.Koopprijs,
      );
    case 'areaDesc':
      return sortedProperties.sort(
        (a, b) => b.Woonoppervlakte - a.Woonoppervlakte,
      );
    case 'newest':
    default:
      return sortedProperties.sort(
        (a, b) =>
          new Date(b.PublicatieDatum).getTime() -
          new Date(a.PublicatieDatum).getTime(),
      );
  }
}

export function getSortByLabel(sortBy: SortBy): string {
  switch (sortBy) {
    case 'newest':
      return 'Newest';
    case 'priceAsc':
      return 'Price: Low to High';
    case 'priceDesc':
      return 'Price: High to Low';
    case 'areaDesc':
      return 'Area: High to Low';
    default:
      return '';
  }
}

export function formatDate(dateString: string, locale: string): string | null {
  const timestamp = dateString.match(
    /^\/Date\((-?\d+)(?:[+-]\d{4})?\)\/$/,
  )?.[1];

  if (!timestamp) {
    return null;
  }

  const date = new Date(Number(timestamp));

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(date);
}
