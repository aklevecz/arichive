# Research Tool

A reading-and-explaining loop that compounds into a knowledge base, built around
the platforms-and-power research (the *ariel app* + *membrane/interception* thesis,
and the seven anchor thinkers: McLuhan, Latour, Marx, Debord, Foucault, Deleuze, Han).

**Highlight a passage → get an explanation framed by the thesis → save it → search it.**

This is a self-contained app that deploys as its own **Cloudflare Worker** (not Pages).
It lives inside the `arichive` repo for now but shares nothing with it — it can be
split into a standalone repo later (`git subtree split --prefix=research-tool`).

## Stack

- **SvelteKit** + `@sveltejs/adapter-cloudflare` → Cloudflare **Worker with Static Assets**
- **Claude** (`claude-opus-4-8`) for explanations — the thesis + seven-thinkers framework is
  prompt-cached in the system block, and responses use structured outputs so every entry
  comes back with explanation + thinker/concept tags
- **D1** (SQLite) — canonical store for entries
- **Vectorize** + **Workers AI** (`bge-base-en-v1.5`, 768-dim) — semantic search, no second API key

## API (extension-ready: JSON + CORS)

- `POST /api/explain` — `{ highlight, context?, sourceTitle? }` → structured explanation (not saved)
- `POST /api/kb` — save an entry → D1 + Vectorize
- `GET  /api/kb?thinker=Foucault` — list recent entries
- `GET  /api/kb/search?q=modulation` — semantic search

A browser extension can later POST to these same endpoints from any page.

## One-time setup

```sh
cd research-tool
npm install

# 1. Create the D1 database, then paste the printed database_id into wrangler.jsonc
npx wrangler d1 create research_kb

# 2. Create the Vectorize index (768 dims, cosine — matches bge-base-en-v1.5)
npx wrangler vectorize create research-kb-index --dimensions=768 --metric=cosine

# 3. Apply the schema
npm run db:migrate          # remote (deployed DB)
# npm run db:migrate:local  # local dev DB

# 4. Set the Claude API key as a secret (for the deployed Worker)
npx wrangler secret put ANTHROPIC_API_KEY

# For local dev, also create .dev.vars from the example:
cp .dev.vars.example .dev.vars   # then edit in your key
```

## Develop

```sh
# Full Worker runtime (D1 + Vectorize + Workers AI bindings). Use this — the
# Anthropic call, embeddings, and Vectorize need the Worker runtime.
npm run preview        # = wrangler dev

# Plain Vite dev (fast UI iteration) works too, but /api routes that need
# bindings will report "binding not available" until you use wrangler dev.
npm run dev
```

> Workers AI and Vectorize execute remotely even in local dev; `wrangler dev`
> connects to them. D1 can run `--local` (see the `db:migrate:local` script).

## Deploy

```sh
npm run deploy         # builds, then `wrangler deploy` → Cloudflare Worker
```
