<script setup lang="ts">
import type { Property } from '#shared/types/property';

const props = defineProps<{ property?: Property }>();

const facts = computed(() => [
  { label: 'Living area', value: `${props.property?.WoonOppervlakte} m²` },
  { label: 'Rooms', value: props.property?.AantalKamers },
  { label: 'Bedrooms', value: props.property?.AantalBadkamers },
  { label: 'Year built', value: props.property?.Bouwjaar },
  { label: 'Energy label', value: props.property?.Energielabel.Label },
]);
</script>

<template>
  <section class="key-facts">
    <h2 class="key-facts-title">Key facts</h2>
    <div class="key-facts-grid">
      <div v-for="fact in facts" :key="fact.label" class="key-fact">
        <span class="key-fact-label">{{ fact.label }}</span>
        <span>{{ fact.value }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.key-facts {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.key-facts-title {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.015em;
}

.key-facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  border-top: 1px solid var(--line, #e7e4df);
  border-left: 1px solid var(--line, #e7e4df);
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface, #fff);
}

.key-fact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border-right: 1px solid var(--line, #e7e4df);
  border-bottom: 1px solid var(--line, #e7e4df);
}

.key-fact-label {
  font-size: 13px;
  color: var(--muted, #6b6862);
}
</style>
