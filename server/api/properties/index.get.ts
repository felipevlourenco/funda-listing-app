// Proxies the Funda listings feed so the API key stays on the server and never
// reaches the browser.
// The feed returns 15 of ~80k listings per page (see `Paging`); we only return
// the first page. Pagination and caching are listed in the README under
// "Further improvements".
export default defineEventHandler(async (event) => {
  const {
    api,
    public: { api: publicApi },
  } = useRuntimeConfig(event);

  if (!publicApi.baseUrl || !api.key) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'API_BASE_URL and API_KEY must be configured on the server',
    });
  }

  const response = await $fetch<Properties>(
    `${publicApi.baseUrl}${api.key}?type=koop`,
  );

  return response.Objects;
});
