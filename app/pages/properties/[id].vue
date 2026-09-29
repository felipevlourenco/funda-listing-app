<script setup lang="ts">
import type { Property } from '#shared/types/property';

const route = useRoute();

const {
  public: { locale, currency },
} = useRuntimeConfig();

const { data: property, error } = await useFetch<Property>(
  `/api/properties/${route.params.id}`,
);

// Render Nuxt's error page with the real status (404 for an unknown listing).
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode,
    statusMessage: error.value.statusMessage,
    fatal: true,
  });
}

useSeoMeta({
  title: () => `${property.value?.Adres} | Funda Listing App`,
  description: () =>
    `${property.value?.Adres}, ${property.value?.Plaats}: ${formatPrice({
      price: property.value?.Prijs.Koopprijs,
      locale,
      currency,
    })}`,
  ogImage: () => property.value?.['Media-Foto']?.[0],
});

const media = getMediaArray({ property: property.value });
</script>

<template>
  <div v-if="property" class="property-detail">
    <PropertiesMedia
      v-if="media.length > 0"
      :media="media"
      :address="property.Adres"
    />
    <div class="property-info">
      <div class="property-sections">
        <PropertiesSummary :property="property" />
        <PropertiesKeyFacts :property="property" />
      </div>
      <PropertiesLocation :property="property" />
    </div>
  </div>
</template>

<style scoped>
.property-detail {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.property-info {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 24px;
  align-items: flex-start;
}

.property-sections {
  flex: 1 1 300px;
  min-width: 0px;
}
</style>
