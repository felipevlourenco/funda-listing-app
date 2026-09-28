<script setup lang="ts">
import type { Property } from '#shared/types/property';

const props = defineProps<{ property?: Property }>();

const zoom = ref(15);
const center = ref(getPropertyLocation({ property: props.property }));
</script>

<template>
  <aside class="property-location">
    <h2 class="property-location-title">Location</h2>
    <div class="map-container">
      <LMap :zoom="zoom" :center="center" :use-global-leaflet="false">
        <LControlLayers position="topright" />
        <!-- <LTileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &amp;copy; Esri"
          layer-type="base"
          name="Light"
        />
        <LTileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles &amp;copy; Esri"
          layer-type="base"
          name="Dark"
        /> -->
        <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; OpenStreetMap contributors"
          layer-type="base"
          name="OpenStreetMap"
        />
        <LMarker :lat-lng="center" />
      </LMap>
    </div>
  </aside>
</template>

<style>
.property-location {
  flex: 1 1 320px;
  min-width: 0px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.property-location-title {
  margin: 0px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.015em;
}

.map-container {
  height: 400px;
  width: calc(100vw - 2rem);
  position: relative;
  z-index: 0;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e7e4df;
  background: #eeece8;
}
</style>
