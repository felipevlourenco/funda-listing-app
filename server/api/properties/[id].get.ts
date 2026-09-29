// Proxies a single listing from the Funda feed (server-side, keeps the key
// private). Responses are not cached yet, see "Further improvements" in the README.
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

  try {
    return await $fetch<Property>(
      `${publicApi.baseUrl}detail/${api.key}/koop/${id}/`,
    );
  } catch (error) {
    // The feed answers 404 for an unknown id and 400 for a malformed one; both
    // mean "not found" to the user. Anything else is an upstream failure.
    const status = (error as { statusCode?: number }).statusCode;

    throw createError({
      statusCode: status === 400 || status === 404 ? 404 : 502,
      statusMessage:
        status === 400 || status === 404
          ? 'Property not found'
          : 'Could not load the property',
    });
  }
});
