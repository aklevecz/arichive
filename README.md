# arichive

Personal site and archive of Ariel Klevecz — projects, writing, AR posters, and experiments. Live at [klevecz.net](https://klevecz.net).

## Stack

- [SvelteKit](https://kit.svelte.dev) (Svelte 5 runes) + Vite
- [mdsvex](https://mdsvex.pngwn.io) for markdown writing/research content in `src/lib/content/`
- Three.js for the WebGL background
- Deployed to Cloudflare via `@sveltejs/adapter-cloudflare`

## Development

```sh
npm install
cp .env.example .env   # fill in contact endpoint values
npm run dev
```

## Notes

- `src/lib/projectToImages.json` is generated — run `node collectProjectImgs.cjs` after adding/removing images under `static/projects/`.
- The contact endpoint (`/contact`) reads `CONTACT_KEY`, `CONTACT_EMAIL`, `CONTACT_PHONE` from the environment; set these as Cloudflare environment variables in production.
- `research-tool/` is a separate SvelteKit app (knowledge-base tool) with its own deploy config.

## TODO

- Ticketing sites
- better recap of flowers
- RSVP site
- BAO LORA
- wheresthefuckingparty.com
- size the flowers properly
- AI Gallery
