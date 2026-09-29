import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import KeyFacts from '~/components/properties/KeyFacts.vue';
import type { Property } from '#shared/types/property';

const property = {
  WoonOppervlakte: 120,
  AantalKamers: 5,
  AantalBadkamers: 2,
  Bouwjaar: 1998,
  Energielabel: { Label: 'A' },
} as Property;

describe('PropertiesKeyFacts', () => {
  it('renders one entry per fact with label and value', async () => {
    const wrapper = await mountSuspended(KeyFacts, { props: { property } });
    const facts = wrapper.findAll('.key-fact').map((f) => f.text());

    expect(facts).toEqual([
      'Living area120 m²',
      'Rooms5',
      'Bedrooms2',
      'Year built1998',
      'Energy labelA',
    ]);
  });
});
