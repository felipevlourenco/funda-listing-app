<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    click?: () => void;
  }>(),
  {
    type: 'button',
    click: () => {},
  },
);
</script>

<template>
  <button :type="type" class="shared-button" @click="click">
    <slot />
  </button>
</template>

<style scoped>
.shared-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 16px;
  border: 1px solid var(--line2, #dcd8d1);
  border-radius: 999px;
  background: var(--surface, #fff);
  color: inherit;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

.shared-button:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

.shared-button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
