<script setup lang="ts">
import type { Object as ListingObject } from '#shared/types/response';

const { data: items } = await useFetch<ListingObject[]>('/api/listings');

console.log('<========================================');
console.log(items.value);
console.log('========================================>');
</script>

<template>
  <header>
    <nav>
      <ul v-if="items && items.length > 0">
        <li v-for="item in items" :key="item.Id">
          {{ item.Adres }} - {{ item.Prijs.Koopprijs }} -
          {{ item.Woonoppervlakte }} m²
        </li>
      </ul>
    </nav>
  </header>
</template>
