import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Media from '~/components/properties/Media.vue';

const media = ['a.jpg', 'b.jpg', 'c.jpg'];
const selectedSrc = (wrapper: Awaited<ReturnType<typeof mountSuspended>>) =>
  wrapper.find('.selected-media').attributes('src');

describe('PropertiesMedia', () => {
  it('selects the first image initially', async () => {
    const wrapper = await mountSuspended(Media, { props: { media } });

    expect(selectedSrc(wrapper)).toBe('a.jpg');
  });

  it('selects a thumbnail on click and marks it selected', async () => {
    const wrapper = await mountSuspended(Media, { props: { media } });

    await wrapper.findAll('.property-carousel-item')[2]!.trigger('click');

    expect(selectedSrc(wrapper)).toBe('c.jpg');
    expect(
      wrapper.find('.property-carousel-item.selected').attributes('src'),
    ).toBe('c.jpg');
  });

  it('moves with the arrow buttons and stops at the ends', async () => {
    const wrapper = await mountSuspended(Media, { props: { media } });

    await wrapper.find('.carousel-button.left').trigger('click');
    expect(selectedSrc(wrapper)).toBe('a.jpg');

    await wrapper.find('.carousel-button.right').trigger('click');
    await wrapper.find('.carousel-button.right').trigger('click');
    await wrapper.find('.carousel-button.right').trigger('click');
    expect(selectedSrc(wrapper)).toBe('c.jpg');
  });

  it('hides the thumbnail strip for a single image', async () => {
    const wrapper = await mountSuspended(Media, {
      props: { media: ['a.jpg'] },
    });

    expect(wrapper.find('.property-carousel').exists()).toBe(false);
  });
});
