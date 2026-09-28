export default defineEventHandler(async (event) => {
  const {
    api,
    public: { api: publicApi },
  } = useRuntimeConfig(event);
  const id = getRouterParam(event, 'id');

  if (!publicApi.baseUrl || !api.key) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'API_BASE_URL and API_KEY must be configured on the server',
    });
  }

  return $fetch<Property>(`${publicApi.baseUrl}detail/${api.key}/koop/${id}/`);
});
