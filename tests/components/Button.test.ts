import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import Button from '~/components/shared/Button.vue';

describe('SharedButton', () => {
  it('renders the slot and defaults to type="button"', async () => {
    const wrapper = await mountSuspended(Button, { slots: { default: 'Go' } });

    expect(wrapper.text()).toBe('Go');
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('uses the given type', async () => {
    const wrapper = await mountSuspended(Button, { props: { type: 'submit' } });

    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('calls the click prop when clicked', async () => {
    const click = vi.fn();
    const wrapper = await mountSuspended(Button, { props: { click } });

    await wrapper.trigger('click');

    expect(click).toHaveBeenCalledOnce();
  });
});
