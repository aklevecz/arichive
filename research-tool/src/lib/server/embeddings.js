/**
 * Generate a 768-dim embedding via Workers AI (bge-base-en-v1.5).
 * Kept separate from Claude so there's no second external API key — embeddings
 * run on the bound AI binding.
 *
 * @param {Ai} ai - platform.env.AI
 * @param {string} text
 * @returns {Promise<number[]>}
 */
export async function embed(ai, text) {
	// result shape is { shape, data: number[][] } — one vector per input string.
	// Cast: the binding's typed union doesn't surface `data` directly.
	const result = /** @type {{ data: number[][] }} */ (
		await ai.run('@cf/baai/bge-base-en-v1.5', { text: [text] })
	);
	return result.data[0];
}
