import { searchEntries } from '$lib/server/kb.js';
import { jsonResponse, preflight } from '$lib/server/cors.js';

export function OPTIONS() {
	return preflight();
}

/** GET /api/kb/search?q=modulation -> semantic matches. */
export async function GET({ url, platform }) {
	if (!platform?.env?.DB) {
		return jsonResponse({ error: 'DB binding not available (run via wrangler/deploy)' }, 500);
	}
	const q = (url.searchParams.get('q') ?? '').trim();
	if (!q) {
		return jsonResponse({ error: 'q is required' }, 400);
	}
	try {
		const entries = await searchEntries(platform.env, q);
		return jsonResponse({ entries });
	} catch (err) {
		return jsonResponse({ error: err instanceof Error ? err.message : 'Search failed' }, 500);
	}
}
