import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Card from '~/components/properties/Card.vue';
import type { Card as CardType } from '~/types';

const property = {
  Id: 'abc-123',
  Prijs: { Koopprijs: 450000 },
  Adres: 'Damrak 1',
  Woonoppervlakte: 85,
  Woonplaats: 'Amsterdam',
  Postcode: '1012 LG',
  AantalKamers: 3,
  Foto: 'https://example.com/photo.jpg',
} as CardType;

describe('PropertiesCard', () => {
  it('shows price, address, postal info and meta', async () => {
    const wrapper = await mountSuspended(Card, { props: { property } });
    const text = wrapper.text();

    expect(text).toContain('€450,000');
    expect(text).toContain('Damrak 1');
    expect(text).toContain('1012 LG Amsterdam');
    expect(text).toContain('85 m² · 3 kamers');
  });

  it('links to the detail page and shows the photo', async () => {
    const wrapper = await mountSuspended(Card, { props: { property } });

    expect(wrapper.find('a').attributes('href')).toBe('/properties/abc-123');
    expect(wrapper.find('img').attributes('src')).toBe(property.Foto);
  });
});
