<script setup lang="ts">
import type { Property } from '#shared/types/property';

defineProps<{ property?: Property }>();

const {
  public: { locale, currency },
} = useRuntimeConfig();
</script>

<template>
  <section class="property-summary">
    <span class="listing-date">
      <span v-if="property?.PublicatieDatum">
        Listed on {{ formatDate(property?.PublicatieDatum, locale) }}
      </span>
    </span>
    <h1 class="property-address">
      <span>{{ property?.Adres }}</span>
    </h1>
    <span class="property-location">
      <span>{{ property?.Postcode }} {{ property?.Plaats }}</span>
    </span>
    <span class="property-price">
      <span>
        {{
          formatPrice({
            price: property?.Prijs.Koopprijs,
            locale,
            currency,
          })
        }}
      </span>
    </span>
    <span class="price-per-area">
      <span>
        {{
          formatPrice({
            price: calculatePricePerSquareMeter({
              price: property?.Prijs.Koopprijs,
              area: property?.WoonOppervlakte,
            }),
            locale,
            currency,
          })
        }}
        per m²
      </span>
    </span>
  </section>
</template>

<style scoped>
.property-summary {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.listing-date {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent, #2f6b4f);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.property-address {
  margin: 4px 0 0;
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.property-location {
  font-size: 16px;
  color: var(--muted, #6b6862);
}

.property-price {
  margin-top: 12px;
  font-size: clamp(26px, 4vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.price-per-area {
  font-size: 14px;
  color: var(--muted, #6b6862);
}
</style>
