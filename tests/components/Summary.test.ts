import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Summary from '~/components/properties/Summary.vue';
import type { Property } from '#shared/types/property';

const property = {
  PublicatieDatum: '/Date(1710460800000)/',
  Adres: 'Damrak 1',
  Postcode: '1012 LG',
  Plaats: 'Amsterdam',
  Prijs: { Koopprijs: 500000 },
  WoonOppervlakte: 100,
} as unknown as Property;

describe('PropertiesSummary', () => {
  it('renders address, location, price and price per m²', async () => {
    const wrapper = await mountSuspended(Summary, { props: { property } });

    expect(wrapper.find('.property-address').text()).toBe('Damrak 1');
    expect(wrapper.find('.property-location').text()).toBe('1012 LG Amsterdam');
    expect(wrapper.find('.property-price').text()).toBe('€500,000');
    expect(wrapper.find('.price-per-area').text()).toBe('€5,000 per m²');
    expect(wrapper.find('.listing-date').text()).toMatch(/^Listed on .*2024/);
  });

  it('omits the listing date when there is none', async () => {
    const wrapper = await mountSuspended(Summary, {
      props: { property: { ...property, PublicatieDatum: undefined } as never },
    });

    expect(wrapper.find('.listing-date').text()).toBe('');
  });
});
