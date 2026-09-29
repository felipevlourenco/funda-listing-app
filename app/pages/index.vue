<script setup lang="ts">
import type { PropertyObject as Property } from '#shared/types/properties';
import type { SortBy } from '~/types';

const { data: items } = await useFetch<Property[]>('/api/properties');

useSeoMeta({ title: 'Homes for sale | Funda Listing App' });

const sort = ref<SortBy>('newest');

const listing = computed(() =>
  sortProperties({ properties: items.value || [], sortBy: sort.value }),
);
</script>

<template>
  <div>
    <div class="listing-header">
      <div class="listing-heading">
        <h1 class="listing-title">Homes for sale</h1>
        <span class="listing-count">
          <span>{{ items?.length || 0 }} results</span>
        </span>
      </div>

      <label class="sort-control">
        <span class="sort-label">Sort</span>
        <span class="sort-value">
          <span>{{ getSortByLabel(sort) }}</span>
        </span>
        <span class="sort-indicator">▼</span>
        <select v-model="sort" aria-label="Sort listings" class="sort-select">
          <option value="newest">Newest</option>
          <option value="priceAsc">Price: low to high</option>
          <option value="priceDesc">Price: high to low</option>
          <option value="areaDesc">Largest first</option>
        </select>
      </label>
    </div>
    <ul v-if="listing.length > 0" class="property-list">
      <li v-for="item in listing" :key="item.Id">
        <PropertiesCard :property="item" />
      </li>
    </ul>
    <div v-else>
      <p>No properties found.</p>
    </div>
  </div>
</template>

<style scoped>
.listing-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.listing-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.listing-title {
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.listing-count {
  font-size: 15px;
  color: #6b6862;
}

.sort-control {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 44px;
  padding: 0 16px;
  border: 1px solid #dcd8d1;
  border-radius: 999px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;
}

.sort-label,
.sort-indicator {
  color: #6b6862;
}

.sort-value {
  font-weight: 600;
}

.sort-indicator {
  margin-left: 2px;
  font-size: 11px;
}

.sort-select {
  position: absolute;
  inset: 0;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  font-size: 16px;
}

.property-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1rem;
}
</style>
