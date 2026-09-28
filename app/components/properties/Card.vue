<script setup lang="ts">
import type { Card } from '~/types/card';

const props = defineProps<{ property: Card }>();

const {
  public: { locale, currency },
} = useRuntimeConfig();
</script>

<template>
  <article>
    <img :src="props.property.Foto" alt="Property Image" />
    <p>
      {{
        formatPrice({ price: props.property.Prijs.Koopprijs, locale, currency })
      }}
    </p>
    <p>{{ props.property.Adres }}</p>
    <p>{{ props.property.Postcode }}</p>
    <p>{{ props.property.Woonplaats }}</p>
    <p>{{ props.property.Woonoppervlakte }} m²</p>
    <p>{{ props.property.AantalKamers }} kamers</p>
  </article>
</template>
