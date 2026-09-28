// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    api: {
      key: process.env.API_KEY,
    },
    public: {
      locale: process.env.LOCALE || 'en-US',
      currency: process.env.CURRENCY || 'EUR',
      api: {
        baseUrl: process.env.API_BASE_URL,
      },
    },
  },
  app: {
    head: { title: 'Funda - Listing App', htmlAttrs: { lang: 'en' } },
  },
});
