import { embed } from './embeddings.js';

/**
 * @typedef {Object} Entry
 * @property {string} id
 * @property {string} created_at
 * @property {string} suggested_title
 * @property {string} highlight
 * @property {string} explanation
 * @property {string} connection
 * @property {string} source_title
 * @property {string} source_url
 * @property {string} context
 * @property {string[]} thinkers
 * @property {string[]} concepts
 */

/** Parse the JSON-array columns into real arrays. @param {any} row */
function rowToEntry(row) {
	return {
		...row,
		thinkers: row.thinkers ? JSON.parse(row.thinkers) : [],
		concepts: row.concepts ? JSON.parse(row.concepts) : []
	};
}

/**
 * Persist an entry to D1 and upsert its embedding into Vectorize.
 * @param {App.Platform['env']} env
 * @param {Omit<Entry, 'id' | 'created_at'>} data
 * @returns {Promise<Entry>}
 */
export async function saveEntry(env, data) {
	const id = crypto.randomUUID();
	const created_at = new Date().toISOString();
	const thinkers = JSON.stringify(data.thinkers ?? []);
	const concepts = JSON.stringify(data.concepts ?? []);

	await env.DB.prepare(
		`INSERT INTO entries
		 (id, created_at, suggested_title, highlight, explanation, connection, source_title, source_url, context, thinkers, concepts)
		 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	)
		.bind(
			id,
			created_at,
			data.suggested_title ?? '',
			data.highlight,
			data.explanation,
			data.connection ?? '',
			data.source_title ?? '',
			data.source_url ?? '',
			data.context ?? '',
			thinkers,
			concepts
		)
		.run();

	// Embed highlight + explanation so semantic search matches on both.
	const vector = await embed(env.AI, `${data.highlight}\n\n${data.explanation}`);
	await env.VECTORIZE.upsert([
		{
			id,
			values: vector,
			metadata: {
				thinkers: data.thinkers ?? [],
				concepts: data.concepts ?? [],
				source_title: data.source_title ?? ''
			}
		}
	]);

	return { id, created_at, ...data, thinkers: data.thinkers ?? [], concepts: data.concepts ?? [] };
}

/**
 * List recent entries, optionally filtered by thinker.
 * @param {App.Platform['env']} env
 * @param {{ thinker?: string, limit?: number }} [opts]
 * @returns {Promise<Entry[]>}
 */
export async function listEntries(env, { thinker, limit = 100 } = {}) {
	let stmt;
	if (thinker) {
		// thinkers is a JSON array string; match the quoted token.
		stmt = env.DB.prepare(
			`SELECT * FROM entries WHERE thinkers LIKE ? ORDER BY created_at DESC LIMIT ?`
		).bind(`%"${thinker}"%`, limit);
	} else {
		stmt = env.DB.prepare(`SELECT * FROM entries ORDER BY created_at DESC LIMIT ?`).bind(limit);
	}
	const { results } = await stmt.all();
	return (results ?? []).map(rowToEntry);
}

/**
 * Semantic search: embed the query, find nearest entries in Vectorize, hydrate from D1.
 * @param {App.Platform['env']} env
 * @param {string} query
 * @param {number} [topK]
 * @returns {Promise<(Entry & { score: number })[]>}
 */
export async function searchEntries(env, query, topK = 10) {
	const vector = await embed(env.AI, query);
	const matches = await env.VECTORIZE.query(vector, { topK, returnMetadata: false });
	const ids = (matches.matches ?? []).map((m) => m.id);
	if (ids.length === 0) return [];

	const scoreById = new Map(matches.matches.map((m) => [m.id, m.score]));
	const placeholders = ids.map(() => '?').join(',');
	const { results } = await env.DB.prepare(
		`SELECT * FROM entries WHERE id IN (${placeholders})`
	)
		.bind(...ids)
		.all();

	return (results ?? [])
		.map(rowToEntry)
		.map((e) => ({ ...e, score: scoreById.get(e.id) ?? 0 }))
		.sort((a, b) => b.score - a.score);
}
