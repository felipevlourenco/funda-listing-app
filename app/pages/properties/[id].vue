<script setup lang="ts">
import type { Property } from '#shared/types/property';

const route = useRoute();

const { data: property } = await useFetch<Property>(
  `/api/properties/${route.params.id}`,
);

const media = getMediaArray({ property: property.value });
</script>

<template>
  <div class="property-detail">
    <PropertiesMedia v-if="media.length > 0" :media="media" />
    <div class="property-info">
      <div class="property-sections">
        <PropertiesSummary :property="property" />
        <PropertiesKeyFacts :property="property" />
        <!-- Description -->
        <div></div>
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
