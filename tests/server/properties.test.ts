import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// The handlers use Nitro auto-imports, so stub those globals and call them directly.
type Handler = (event: unknown) => Promise<unknown>;

const config = {
  api: { key: 'KEY' as string | undefined },
  public: { api: { baseUrl: 'https://api.test/' as string | undefined } },
};
const $fetch = vi.fn();
const getRouterParam = vi.fn();
const createError = vi.fn((e: object) => Object.assign(new Error('err'), e));

let list: Handler;
let detail: Handler;

beforeAll(async () => {
  vi.stubGlobal('defineEventHandler', (h: Handler) => h);
  vi.stubGlobal('useRuntimeConfig', () => config);
  vi.stubGlobal('$fetch', $fetch);
  vi.stubGlobal('getRouterParam', getRouterParam);
  vi.stubGlobal('createError', createError);

  list = (await import('../../server/api/properties/index.get')).default;
  detail = (await import('../../server/api/properties/[id].get')).default;
});

beforeEach(() => {
  vi.clearAllMocks();
  config.api.key = 'KEY';
  config.public.api.baseUrl = 'https://api.test/';
});

describe.each([
  ['GET /api/properties', () => list],
  ['GET /api/properties/:id', () => detail],
])('%s config guard', (_, handler) => {
  it.each([
    ['API key', () => (config.api.key = undefined)],
    ['base URL', () => (config.public.api.baseUrl = undefined)],
  ])('throws a 500 when the %s is missing', async (_, unset) => {
    unset();

    await expect(handler()({})).rejects.toMatchObject({ statusCode: 500 });
    expect($fetch).not.toHaveBeenCalled();
  });
});

describe('GET /api/properties', () => {
  it('fetches koop listings and returns only Objects', async () => {
    const Objects = [{ Id: '1' }, { Id: '2' }];
    $fetch.mockResolvedValue({ Objects, Paging: {} });

    await expect(list({})).resolves.toEqual(Objects);
    expect($fetch).toHaveBeenCalledWith('https://api.test/KEY?type=koop');
  });

  it('propagates upstream failures', async () => {
    $fetch.mockRejectedValue(new Error('upstream down'));

    await expect(list({})).rejects.toThrow('upstream down');
  });
});

describe('GET /api/properties/:id', () => {
  it('fetches the detail for the route id', async () => {
    const property = { Id: '42' };
    getRouterParam.mockReturnValue('42');
    $fetch.mockResolvedValue(property);

    await expect(detail({ ev: 1 })).resolves.toBe(property);
    expect(getRouterParam).toHaveBeenCalledWith({ ev: 1 }, 'id');
    expect($fetch).toHaveBeenCalledWith('https://api.test/detail/KEY/koop/42/');
  });
});
