import { listEntries } from '$lib/server/kb.js';

/** Server-load recent entries (optionally filtered by ?thinker=). */
export async function load({ url, platform }) {
	const thinker = url.searchParams.get('thinker') ?? undefined;

	if (!platform?.env?.DB) {
		// Dev without bindings (plain `vite dev`): render the page, no data.
		return { entries: [], thinker, unavailable: true };
	}

	try {
		const entries = await listEntries(platform.env, { thinker });
		return { entries, thinker, unavailable: false };
	} catch (err) {
		return {
			entries: [],
			thinker,
			unavailable: false,
			error: err instanceof Error ? err.message : 'Failed to load entries'
		};
	}
}
