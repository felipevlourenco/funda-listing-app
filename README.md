# Funda Listing App

A Nuxt 4 app that lists homes for sale and shows a detail page for each one, with a photo carousel and a map.

## Requirements

- Node.js 20.19 or newer
- [Yarn](https://yarnpkg.com/) (classic, v1)

## Install

```bash
git clone <repository-url>
cd funda-listing-app
yarn install
cp .env.example .env
```

Then fill in `API_BASE_URL` and `API_KEY` in `.env`.

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
