import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import Location from '~/components/properties/Location.vue';
import type { Property } from '#shared/types/property';

// Leaflet needs a real browser, so the map components are mocked.
vi.mock('@vue-leaflet/vue-leaflet', async () => {
  const { defineComponent, h } = await import('vue');
  const stub = (name: string, props: string[] = []) =>
    defineComponent({
      name,
      props,
      setup:
        (_, { slots }) =>
        () =>
          h('div', { class: name }, slots.default?.()),
    });

  return {
    LMap: stub('LMap', ['center', 'zoom']),
    LTileLayer: stub('LTileLayer'),
    LMarker: stub('LMarker', ['latLng']),
  };
});

const property = { WGS84_Y: 52.37, WGS84_X: 4.9 } as Property;

describe('PropertiesLocation', () => {
  it('renders the title and centres the map and marker on [lat, lng]', async () => {
    const wrapper = await mountSuspended(Location, { props: { property } });

    expect(wrapper.find('h2').text()).toBe('Location');
    expect(wrapper.findComponent('.LMap').props('center')).toEqual([
      52.37, 4.9,
    ]);
    expect(wrapper.findComponent('.LMarker').props('latLng')).toEqual([
      52.37, 4.9,
    ]);
  });
});
