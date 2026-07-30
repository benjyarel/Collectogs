# Collectogs

Collectogs connects to your [Discogs](https://www.discogs.com/) account and, for any artist, shows you which albums (masters) are **missing from your collection** — so you know exactly what to look for next time you're crate-digging.

## How it works

1. Log in with your Discogs account (OAuth 1.0a).
2. Pick a folder from your collection and an artist.
3. Collectogs fetches the artist's full discography from Discogs and cross-references it against your collection to highlight the albums you don't own yet.

> [!WARNING]
> Discogs is a community-maintained database, so data quality varies from artist to artist. Duplicate or miscategorized masters, inconsistent artist naming, and other approximations do happen — the "missing albums" list should be treated as a helpful guide, not an exact truth.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Server Actions for data fetching/mutations (no client-side fetching or API routes where avoidable)
- [Vitest](https://vitest.dev) + Testing Library for unit tests
- ESLint

## Getting Started

### Prerequisites

You'll need a [Discogs API application](https://www.discogs.com/settings/developers) to get a consumer key/secret.

### Setup

```bash
npm install
```

Create a `.env` file at the project root:

```bash
DISCOG_CONSUMER_KEY=your_consumer_key
DISCOG_CONSUMER_SECRET=your_consumer_secret
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Scripts

| Command         | Description                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the dev server             |
| `npm run build` | Build for production             |
| `npm run start` | Start the production server      |
| `npm run lint`  | Run ESLint                       |
| `npm run test`  | Run the test suite (Vitest)      |

## Project Structure

See [CLAUDE.md](./CLAUDE.md) for architecture conventions and code style guidelines.
