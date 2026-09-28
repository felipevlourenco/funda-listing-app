export default defineEventHandler(async (event) => {
  const { api } = useRuntimeConfig(event);

  if (!api.baseUrl || !api.key) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'API_BASE_URL and API_KEY must be configured on the server',
    });
  }

  const response = await $fetch<ListingResponse>(
    `${api.baseUrl}${api.key}?type=koop`,
  );

  return response.Objects;
});
