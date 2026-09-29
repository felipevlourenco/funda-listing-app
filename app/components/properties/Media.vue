<script setup lang="ts">
const props = defineProps<{ media: string[] }>();

const selectedMedia = ref(props.media[0] || null);

const selectMedia = (mediaItem: string) => {
  selectedMedia.value = mediaItem;
};
</script>

<template>
  <div class="property-media">
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
