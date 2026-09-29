import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import Media from '~/components/properties/Media.vue';

const media = ['a.jpg', 'b.jpg', 'c.jpg'];
const mountMedia = (props: { media: string[]; address?: string } = { media }) =>
  mountSuspended(Media, { props });
type Wrapper = Awaited<ReturnType<typeof mountMedia>>;

const selected = (wrapper: Wrapper) => wrapper.find('.selected-media');
const thumbs = (wrapper: Wrapper) => wrapper.findAll('.property-carousel-item');
const arrow = (wrapper: Wrapper, side: 'left' | 'right') =>
  wrapper.find(`.carousel-button.${side}`);

describe('PropertiesMedia', () => {
  it('selects the first image initially', async () => {
    const wrapper = await mountMedia();

    expect(selected(wrapper).attributes('src')).toBe('a.jpg');
  });

  it('selects a thumbnail on click and marks it as current', async () => {
    const wrapper = await mountMedia();

    await thumbs(wrapper)[2]!.trigger('click');

    expect(selected(wrapper).attributes('src')).toBe('c.jpg');
    expect(thumbs(wrapper).map((t) => t.attributes('aria-current'))).toEqual([
      'false',
      'false',
      'true',
    ]);
  });

  it('moves with the arrow buttons and stops at the ends', async () => {
    const wrapper = await mountMedia();

    await arrow(wrapper, 'left').trigger('click');
    expect(selected(wrapper).attributes('src')).toBe('a.jpg');

    for (let i = 0; i < 3; i++) await arrow(wrapper, 'right').trigger('click');
    expect(selected(wrapper).attributes('src')).toBe('c.jpg');
  });

  it('hides the thumbnail strip for a single image', async () => {
    const wrapper = await mountMedia({ media: ['a.jpg'] });

    expect(wrapper.find('.property-carousel').exists()).toBe(false);
  });

  describe('accessibility', () => {
    it('uses real buttons for the arrows and thumbnails, with labels', async () => {
      const wrapper = await mountMedia();

      expect(arrow(wrapper, 'left').attributes('aria-label')).toBe(
        'Previous photo',
      );
      expect(arrow(wrapper, 'right').attributes('aria-label')).toBe(
        'Next photo',
      );
      expect(thumbs(wrapper).every((t) => t.element.tagName === 'BUTTON')).toBe(
        true,
      );
      expect(thumbs(wrapper).map((t) => t.attributes('aria-label'))).toEqual([
        'Show photo 1 of 3',
        'Show photo 2 of 3',
        'Show photo 3 of 3',
      ]);
    });

    it('describes the selected image with the address and position', async () => {
      const wrapper = await mountMedia({ media, address: 'Damrak 1' });

      expect(selected(wrapper).attributes('alt')).toBe(
        'Damrak 1, photo 1 of 3',
      );

      await thumbs(wrapper)[1]!.trigger('click');
      expect(selected(wrapper).attributes('alt')).toBe(
        'Damrak 1, photo 2 of 3',
      );
    });

    it('marks thumbnail images as decorative', async () => {
      const wrapper = await mountMedia();

      expect(
        thumbs(wrapper).every((t) => t.find('img').attributes('alt') === ''),
      ).toBe(true);
    });
  });
});
