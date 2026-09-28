<script setup lang="ts">
import type { Object as Property } from '#shared/types/properties';

const { data: items } = await useFetch<Property[]>('/api/properties');
</script>

<template>
  <header>
    <nav>
      <ul v-if="items && items.length > 0">
        <li v-for="item in items" :key="item.Id">
          {{ item.Adres }} - {{ item.Prijs.Koopprijs }} -
          {{ item.Woonoppervlakte }} m²
          <NuxtLink :to="`/properties/${item.Id}`">View</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
