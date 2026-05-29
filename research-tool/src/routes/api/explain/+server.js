import { explainHighlight } from '$lib/server/anthropic.js';
import { jsonResponse, preflight } from '$lib/server/cors.js';

export function OPTIONS() {
	return preflight();
}

/** POST { highlight, context?, sourceTitle? } -> structured explanation (not saved). */
export async function POST({ request, platform }) {
	if (!platform?.env?.ANTHROPIC_API_KEY) {
		return jsonResponse({ error: 'ANTHROPIC_API_KEY is not configured' }, 500);
	}

	let body;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ error: 'Invalid JSON body' }, 400);
	}

	const highlight = (body.highlight ?? '').trim();
	if (!highlight) {
		return jsonResponse({ error: 'highlight is required' }, 400);
	}

	try {
		const result = await explainHighlight(platform.env.ANTHROPIC_API_KEY, {
			highlight,
			context: body.context ?? '',
			sourceTitle: body.sourceTitle ?? ''
		});
		return jsonResponse(result);
	} catch (err) {
		return jsonResponse({ error: err instanceof Error ? err.message : 'Explain failed' }, 502);
	}
}
