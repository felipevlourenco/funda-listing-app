<script setup lang="ts"></script>

<template>
  <div>
    <header>
      <div class="header-content">
        <span>Funda Listing App</span>
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
}

header {
  position: sticky;
  top: 0px;
  z-index: 20;
  background: var(--header, rgba(250, 249, 247, 0.92));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line, #e7e4df);
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
