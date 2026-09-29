import { describe, expect, it } from 'vitest';
import {
  calculatePricePerSquareMeter,
  formatDate,
  formatPrice,
  getMediaArray,
  getPropertyLocation,
  getSortByLabel,
  sortProperties,
} from '~/utils';

// Only the fields the utils read.
const item = (
  Id: string,
  price: number,
  area: number,
  date: string,
): PropertyObject =>
  ({
    Id,
    Prijs: { Koopprijs: price },
    Woonoppervlakte: area,
    PublicatieDatum: date,
  }) as unknown as PropertyObject;

const a = item('a', 300, 50, '2024-01-01');
const b = item('b', 100, 90, '2024-03-01');
const c = item('c', 200, 70, '2024-02-01');
const ids = (list: PropertyObject[]) => list.map((p) => p.Id);

describe('formatPrice', () => {
  it('formats as whole-unit currency for the locale', () => {
    expect(
      formatPrice({ price: 450000, locale: 'en-US', currency: 'EUR' }),
    ).toBe('€450,000');
    expect(
      formatPrice({ price: 1234.56, locale: 'en-US', currency: 'USD' }),
    ).toBe('$1,235');
  });

  it('defaults a missing price to 0', () => {
    expect(formatPrice({ locale: 'en-US', currency: 'EUR' })).toBe('€0');
  });
});

describe('getMediaArray', () => {
  it('returns the Media-Foto list', () => {
    const property = {
      'Media-Foto': ['a.jpg', 'b.jpg'],
    } as unknown as Property;

    expect(getMediaArray({ property })).toEqual(['a.jpg', 'b.jpg']);
  });

  it('returns [] when there is no property or no photos', () => {
    expect(getMediaArray({})).toEqual([]);
    expect(getMediaArray({ property: {} as Property })).toEqual([]);
  });
});

describe('calculatePricePerSquareMeter', () => {
  it('divides price by area', () => {
    expect(calculatePricePerSquareMeter({ price: 500000, area: 100 })).toBe(
      5000,
    );
  });

  it('returns 0 for missing or zero inputs', () => {
    expect(calculatePricePerSquareMeter({ area: 100 })).toBe(0);
    expect(calculatePricePerSquareMeter({ price: 100 })).toBe(0);
    expect(calculatePricePerSquareMeter({ price: 100, area: 0 })).toBe(0);
  });
});

describe('getPropertyLocation', () => {
  it('returns [lat, lng] from WGS84_Y / WGS84_X', () => {
    const property = { WGS84_Y: 52.37, WGS84_X: 4.9 } as unknown as Property;

    expect(getPropertyLocation({ property })).toEqual([52.37, 4.9]);
  });

  it('falls back to [0, 0]', () => {
    expect(getPropertyLocation({})).toEqual([0, 0]);
  });
});

describe('sortProperties', () => {
  const list = [a, b, c];

  it.each([
    ['priceAsc', ['b', 'c', 'a']],
    ['priceDesc', ['a', 'c', 'b']],
    ['areaDesc', ['b', 'c', 'a']],
    ['newest', ['b', 'c', 'a']],
  ] as const)('sorts by %s', (sortBy, expected) => {
    expect(ids(sortProperties({ properties: list, sortBy }))).toEqual(expected);
  });

  it('does not mutate the input', () => {
    sortProperties({ properties: list, sortBy: 'priceAsc' });

    expect(ids(list)).toEqual(['a', 'b', 'c']);
  });
});

describe('getSortByLabel', () => {
  it('maps every sort option to its label', () => {
    expect(getSortByLabel('newest')).toBe('Newest');
    expect(getSortByLabel('priceAsc')).toBe('Price: Low to High');
    expect(getSortByLabel('priceDesc')).toBe('Price: High to Low');
    expect(getSortByLabel('areaDesc')).toBe('Area: High to Low');
  });

  it('returns an empty string for an unknown option', () => {
    expect(getSortByLabel('nope' as never)).toBe('');
  });
});

describe('formatDate', () => {
  it('formats a /Date(ms)/ string', () => {
    expect(formatDate('/Date(1710460800000)/', 'en-US')).toBe('Mar 15, 2024');
  });

  it('accepts a timezone offset suffix', () => {
    expect(formatDate('/Date(1710460800000+0100)/', 'en-US')).toBe(
      'Mar 15, 2024',
    );
  });

  it('returns null for other formats and out-of-range timestamps', () => {
    expect(formatDate('2024-03-15', 'en-US')).toBeNull();
    expect(formatDate('', 'en-US')).toBeNull();
    expect(formatDate('/Date(99999999999999999)/', 'en-US')).toBeNull();
  });
});
