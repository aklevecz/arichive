import { listEntries, saveEntry } from '$lib/server/kb.js';
import { jsonResponse, preflight } from '$lib/server/cors.js';

export function OPTIONS() {
	return preflight();
}

/** GET /api/kb?thinker=Foucault -> recent entries. */
export async function GET({ url, platform }) {
	if (!platform?.env?.DB) {
		return jsonResponse({ error: 'DB binding not available (run via wrangler/deploy)' }, 500);
	}
	const thinker = url.searchParams.get('thinker') ?? undefined;
	try {
		const entries = await listEntries(platform.env, { thinker });
		return jsonResponse({ entries });
	} catch (err) {
		return jsonResponse({ error: err instanceof Error ? err.message : 'List failed' }, 500);
	}
}

/** POST /api/kb  body = entry fields -> saves to D1 + Vectorize. */
export async function POST({ request, platform }) {
	if (!platform?.env?.DB) {
		return jsonResponse({ error: 'DB binding not available (run via wrangler/deploy)' }, 500);
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ error: 'Invalid JSON body' }, 400);
	}

	if (!body.highlight || !body.explanation) {
		return jsonResponse({ error: 'highlight and explanation are required' }, 400);
	}

	try {
		const entry = await saveEntry(platform.env, {
			suggested_title: body.suggested_title ?? '',
			highlight: body.highlight,
			explanation: body.explanation,
			connection: body.connection ?? '',
			source_title: body.source_title ?? '',
			source_url: body.source_url ?? '',
			context: body.context ?? '',
			thinkers: Array.isArray(body.thinkers) ? body.thinkers : [],
			concepts: Array.isArray(body.concepts) ? body.concepts : []
		});
		return jsonResponse({ entry }, 201);
	} catch (err) {
		return jsonResponse({ error: err instanceof Error ? err.message : 'Save failed' }, 500);
	}
}
