<script setup lang="ts">
import type { Object as Property } from '#shared/types/properties';

const { data: items } = await useFetch<Property[]>('/api/properties');
</script>

<template>
  <ul v-if="items && items.length > 0">
    <li v-for="item in items" :key="item.Id">
      <PropertiesCard :property="item" />
    </li>
  </ul>
</template>

<style>
ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
  gap: 1rem;
}
</style>
