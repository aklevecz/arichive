/**
 * CORS headers so a future browser extension can call /api/* from any page.
 * Tighten the origin once the extension's ID is known.
 */
export const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
};

/** Standard preflight response. */
export function preflight() {
	return new Response(null, { status: 204, headers: CORS_HEADERS });
}

/** @param {unknown} data @param {number} [status] */
export function jsonResponse(data, status = 200) {
	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json', ...CORS_HEADERS }
	});
}
