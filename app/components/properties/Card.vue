<script setup lang="ts">
import type { Card } from '~/types';

const {
  public: { locale, currency },
} = useRuntimeConfig();

const props = defineProps<{ property: Card }>();
</script>

<template>
  <article>
    <NuxtLink :to="`/properties/${props.property.Id}`">
      <img :src="props.property.Foto" alt="Property Image" />
      <div class="property-details">
        <h4 class="property-price">
          {{
            formatPrice({
              price: props.property.Prijs.Koopprijs,
              locale,
              currency,
            })
          }}
        </h4>
        <span class="property-street">{{ props.property.Adres }}</span>
        <div class="property-postal">
          <span
            >{{ props.property.Postcode }} {{ props.property.Woonplaats }}</span
          >
        </div>
        <div class="property-meta">
          <span
            >{{ props.property.Woonoppervlakte }} m² ·
            {{ props.property.AantalKamers }} kamers</span
          >
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<style>
article {
  cursor: pointer;
  padding-bottom: 16px;
  border-bottom: 1px solid #e7e4df;

  * {
    text-decoration: none;
    color: inherit;
  }
}

a {
  display: flex;
  gap: 1rem;

  @media (min-width: 900px) {
    flex-direction: column;
  }
}

img {
  /* width: 100%;
  height: auto; */
  border-radius: 12px;
  aspect-ratio: 1 / 1;
  height: 120px;
  width: 120px;

  @media (min-width: 900px) {
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
  }
}

.property-details {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.property-price {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.property-street {
  font-size: 15px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.property-postal {
  font-size: 14px;
  font-weight: 400;
  color: #6e6e6e;
}

.property-meta {
  font-size: 13px;
  color: #3d3b37;
  margin-top: 4px;
}
</style>
