<script setup lang="ts">
import type { Property } from '#shared/types/property';

const route = useRoute();
const { data: property, error } = await useFetch<Property>(
  `/api/properties/${route.params.id}`,
);
</script>

<template>
  <header>
    <nav>
      <ul>
        {{
          property?.Adres
        }}
      </ul>
    </nav>
  </header>
</template>
