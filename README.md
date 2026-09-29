# Funda Listing App

A Nuxt 4 app that lists homes for sale and shows a detail page for each one, with a photo carousel and a map.

**Live demo:** https://funda-listing-app.vercel.app/

## Requirements

- Node.js 20.19 or newer
- [Yarn](https://yarnpkg.com/)

## Install

```bash
git clone <repository-url>
cd funda-listing-app
yarn install
cp .env.example .env
```

Then fill in `API_BASE_URL` and `API_KEY` in `.env`:

- `API_BASE_URL`: `https://partnerapi.funda.nl/feeds/Aanbod.svc/json/`
- `API_KEY`: the temporary key from the Funda assignment brief (it is not committed to the repo)

The key is only read on the server (`server/api/properties`), so it is never sent to the browser. When deploying (e.g. on Vercel), set the same variables in the project's environment settings.

| Variable       | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `API_BASE_URL` | Listing API base URL, with a trailing slash (the key is appended) |
| `API_KEY`      | Listing API key (server-side only)                                |
| `LOCALE`       | Locale for prices and dates, e.g. `nl-NL` (default `en-US`)       |
| `CURRENCY`     | Currency code, e.g. `EUR` (default `EUR`)                         |

`.env` is git-ignored; never commit real keys.

## Run

```bash
yarn dev
```

The app is served at `http://localhost:3000`.

## Scripts

| Script              | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `yarn dev`          | Start the development server                          |
| `yarn build`        | Build for production                                  |
| `yarn preview`      | Preview the production build locally                  |
| `yarn generate`     | Generate a static version of the app                  |
| `yarn test`         | Run all unit tests (components, utils and API routes) |
| `yarn test:watch`   | Run the component and utils tests in watch mode       |
| `yarn lint`         | Lint with ESLint                                      |
| `yarn lint:fix`     | Lint and auto-fix                                     |
| `yarn format`       | Format the code with Prettier                         |
| `yarn format:check` | Check formatting without writing changes              |

## Project structure

```
app/          Nuxt app: pages, components, layouts, utils
server/api/   API routes that proxy the listing API
shared/types/ TypeScript types shared by app and server
tests/        Unit tests (components, utils, server)
```

## Further improvements

Things I would do next, roughly in priority order:

**Data and performance**

- **Pagination:** the feed returns 15 of ~80,000 listings per page (`Paging`, `TotaalAantalObjecten`). Only the first page is shown, and the "results" count is the page size, not the real total. Add "load more" or page links driven by a `?page=` query param.
- **Caching:** API responses are fetched on every request. Cache them on the server (`cachedEventHandler` or `routeRules` with `swr`) so the list and details are served fast and the upstream API is hit less. Listings change slowly, so a few minutes is enough.
- **Images:** use `@nuxt/image` for resizing, modern formats and `srcset`, and add `loading="lazy"` plus explicit width/height to avoid layout shift.

**Features**

- **Search and filters:** price range, city, rooms and living area, kept in the URL so results can be shared.
- **Sort in the URL:** the sort selection is local state and is lost on navigation.
- **Richer details page:** show the description (`Omschrijving`), features and agent info, which are in the data but not displayed yet.
- **JSON-LD** Add JSON-LD structured data for SEO.

**Quality**

- **Loading and error states:** skeleton placeholders, a retry action, and a custom error page.
- **Tests and CI:** add end-to-end tests (Playwright) and run lint, format and tests in CI.
- **i18n:** the UI copy is English while the data is Dutch; move strings to `@nuxtjs/i18n`.
