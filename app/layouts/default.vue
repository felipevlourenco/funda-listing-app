<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <div>
    <header>
      <div class="header-content">
        <span v-if="route.name === 'index'">Funda Listing App</span>
        <button v-else @click="$router.back()">Back</button>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<style>
main {
  padding: 1rem;
  max-width: 1200px;
  margin: 0px auto;
}

header {
  position: sticky;
  top: 0px;
  z-index: 20;
  background: #faf9f7eb;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e7e4df;
}

.header-content {
  max-width: 1200px;
  margin: 0px auto;
  height: 60px;
  padding: 0px clamp(16px, 4vw, 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header-content span {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>
