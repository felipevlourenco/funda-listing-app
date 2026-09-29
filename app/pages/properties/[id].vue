<script setup lang="ts">
import type { Property } from '#shared/types/property';

const route = useRoute();
const {
  public: { locale, currency },
} = useRuntimeConfig();

const { data: property } = await useFetch<Property>(
  `/api/properties/${route.params.id}`,
);

const media = getMediaArray({ property: property.value });
const selectedMedia = ref(media[0] || null);

const selectMedia = (mediaItem: string) => {
  selectedMedia.value = mediaItem;
};

console.log('<========================================');
console.log(property.value);
console.log('========================================>');
</script>

<template>
  <div class="property-detail">
    <div v-if="media && media.length > 0" class="property-media">
      <img
        v-if="selectedMedia"
        :src="selectedMedia"
        alt="Selected Property Image"
        class="selected-media"
      />
      <button
        class="carousel-button left"
        @click="
          selectMedia(
            media[Math.max(0, media.indexOf(selectedMedia ?? '') - 1)] ?? '',
          )
        "
      >
        ←
      </button>
      <button
        class="carousel-button right"
        @click="
          selectMedia(
            media[
              Math.min(media.length - 1, media.indexOf(selectedMedia ?? '') + 1)
            ] ?? '',
          )
        "
      >
        →
      </button>
      <div v-if="media.length > 1" class="property-carousel">
        <img
          v-for="(item, index) in media"
          :key="index"
          :src="item"
          :class="{
            'property-carousel-item': true,
            selected: selectedMedia === item,
          }"
          alt="Property Image"
          @click="selectMedia(item)"
        />
      </div>
    </div>
    <div class="property-info">
      <div class="property-sections">
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
        <section class="key-facts">
          <h2 class="key-facts-title">Key facts</h2>
          <div class="key-facts-grid">
            <div class="key-fact">
              <span class="key-fact-label">
                <span>Living area</span>
              </span>
              <span>
                <span>{{ property?.WoonOppervlakte }} m²</span>
              </span>
            </div>

            <div class="key-fact">
              <span class="key-fact-label">
                <span>Rooms</span>
              </span>
              <span>
                <span>{{ property?.AantalKamers }}</span>
              </span>
            </div>

            <div class="key-fact">
              <span class="key-fact-label">
                <span>Bedrooms</span>
              </span>
              <span>
                <span>{{ property?.AantalBadkamers }}</span>
              </span>
            </div>

            <div class="key-fact">
              <span class="key-fact-label">
                <span>Year built</span>
              </span>
              <span>
                <span>{{ property?.Bouwjaar }}</span>
              </span>
            </div>

            <div class="key-fact">
              <span class="key-fact-label">
                <span>Energy label</span>
              </span>
              <span>
                <span>{{ property?.Energielabel.Label }}</span>
              </span>
            </div>
          </div>
        </section>
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

.property-media {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #000000;
  opacity: 0.3;
  border: none;
  padding: 12px;
  cursor: pointer;
  z-index: 1;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  border-radius: 50%;

  @media (min-width: 900px) {
    display: none;
  }
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}

.carousel-button:hover {
  opacity: 0.6;
}

.selected-media {
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 4 / 3;

  @media (min-width: 900px) {
    aspect-ratio: 16 / 9;
  }
}

.property-carousel {
  display: none;

  @media (min-width: 900px) {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    gap: 10px;
  }
}

.property-carousel-item {
  max-width: 100px;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  padding: 0px;
  cursor: pointer;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}

.selected {
  border: 2px solid rgb(29, 28, 26);
  opacity: 1;
}
</style>
