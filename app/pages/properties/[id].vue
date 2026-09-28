<script setup lang="ts">
import type { Property } from '#shared/types/property';

const route = useRoute();
const {
  public: { locale, currency },
} = useRuntimeConfig();

const { data: property, error } = await useFetch<Property>(
  `/api/properties/${route.params.id}`,
);

const media = getMediaArray({ property: property.value });
const selectedMedia = ref(media[0] || null);

const selectMedia = (mediaItem: string) => {
  selectedMedia.value = mediaItem;
};
</script>

<template>
  <div class="property-detail">
    <div v-if="media && media.length > 0">
      <img
        v-if="selectedMedia"
        :src="selectedMedia"
        alt="Selected Property Image"
        class="selected-media"
      />
      <div v-if="media.length > 1" class="property-carousel">
        <img
          v-for="(item, index) in media"
          :key="index"
          :src="item"
          @click="selectMedia(item)"
          class="property-carousel-item"
          alt="Property Image"
        />
      </div>
    </div>
    <span>{{ property?.Adres }}</span>
    <span> {{ property?.Postcode }} {{ property?.Plaats }}</span>
    <span>{{
      formatPrice({ price: property?.Prijs.Koopprijs, locale, currency })
    }}</span>
    <span
      >{{
        formatPrice({
          price: calculatePricePerSquareMeter({
            price: property?.Prijs.Koopprijs,
            area: property?.WoonOppervlakte,
          }),
          locale,
          currency,
        })
      }}
      per m²</span
    >
    <!-- Key facts -->
    <div></div>
    <!-- Description -->
    <div></div>

    <PropertiesLocation :property="property" />
  </div>
</template>

<style>
.property-detail {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.selected-media {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.property-carousel {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  gap: 10px;
}

.property-carousel-item {
  max-width: 100px;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  padding: 0px;
  cursor: pointer;
  border: 2px solid rgb(29, 28, 26);
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
