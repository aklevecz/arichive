import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-cloudflare builds for Cloudflare Workers with Static Assets.
		// Deploy target is determined by wrangler.jsonc (main + assets binding)
		// and `wrangler deploy` — NOT Pages.
		adapter: adapter()
	}
};

export default config;
