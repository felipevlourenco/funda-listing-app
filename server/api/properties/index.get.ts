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
