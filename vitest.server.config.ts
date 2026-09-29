import { defineConfig } from 'vitest/config';

// Plain node run: the Nuxt vite plugin would rewrite the handlers' Nitro auto-imports.
export default defineConfig({
  test: { include: ['tests/server/**/*.test.ts'] },
});
