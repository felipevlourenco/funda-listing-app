<script setup lang="ts">
const props = defineProps<{ media: string[]; address?: string }>();

const selectedIndex = ref(0);
const selectedMedia = computed(() => props.media[selectedIndex.value]);
const photoLabel = (index: number) =>
  `Photo ${index + 1} of ${props.media.length}`;

const selectMedia = (index: number) => {
  selectedIndex.value = Math.min(Math.max(index, 0), props.media.length - 1);
};
</script>

<template>
  <div class="property-media">
    <img
      v-if="selectedMedia"
      :src="selectedMedia"
      :alt="`${address ?? 'Property'}, ${photoLabel(selectedIndex).toLowerCase()}`"
      class="selected-media"
    />
    <button
      type="button"
      class="carousel-button left"
      aria-label="Previous photo"
      @click="selectMedia(selectedIndex - 1)"
    >
      ←
    </button>
    <button
      type="button"
      class="carousel-button right"
      aria-label="Next photo"
      @click="selectMedia(selectedIndex + 1)"
    >
      →
    </button>
    <div v-if="media.length > 1" class="property-carousel">
      <button
        v-for="(item, index) in media"
        :key="item"
        type="button"
        :class="{
          'property-carousel-item': true,
          selected: selectedIndex === index,
        }"
        :aria-label="`Show ${photoLabel(index).toLowerCase()}`"
        :aria-current="selectedIndex === index"
        @click="selectMedia(index)"
      >
        <!-- Decorative: the button already carries the label -->
        <img :src="item" alt="" loading="lazy" />
      </button>
    </div>
  </div>
</template>

<style scoped>
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
  flex: 0 0 100px;
  aspect-ratio: 4 / 3;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  background: none;
  cursor: pointer;
  opacity: 0.7;
}

.property-carousel-item img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 0;
  object-fit: cover;
}

.property-carousel-item.selected {
  border-color: rgb(29, 28, 26);
  opacity: 1;
}
</style>
