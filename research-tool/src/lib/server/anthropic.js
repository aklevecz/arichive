import Anthropic from '@anthropic-ai/sdk';
import { FRAMEWORK_SYSTEM, THINKERS } from './framework.js';

/** JSON schema for a structured explanation. Drives output_config.format. */
const EXPLANATION_SCHEMA = {
	type: 'object',
	additionalProperties: false,
	properties: {
		explanation: {
			type: 'string',
			description: 'A clear, self-contained explanation of the highlighted passage in its own terms.'
		},
		connection: {
			type: 'string',
			description:
				"How this connects to the project thesis and the relevant anchor thinkers. Empty string if there is no genuine connection."
		},
		thinkers: {
			type: 'array',
			description: 'The anchor thinkers this passage genuinely illuminates.',
			items: { type: 'string', enum: THINKERS }
		},
		concepts: {
			type: 'array',
			description: 'A few short, lowercase concept tags (e.g. "modulation", "fetishism").',
			items: { type: 'string' }
		},
		suggested_title: {
			type: 'string',
			description: 'A short title (<= 8 words) for this knowledge-base entry.'
		}
	},
	required: ['explanation', 'connection', 'thinkers', 'concepts', 'suggested_title']
};

/**
 * Ask Claude to explain a highlighted passage, framed by the project thesis.
 * The framework lives in a cached system block so repeated calls are cheap.
 *
 * @param {string} apiKey
 * @param {{ highlight: string, context?: string, sourceTitle?: string }} input
 * @returns {Promise<{explanation: string, connection: string, thinkers: string[], concepts: string[], suggested_title: string}>}
 */
export async function explainHighlight(apiKey, { highlight, context = '', sourceTitle = '' }) {
	const client = new Anthropic({ apiKey });

	const userText = [
		sourceTitle ? `Source: ${sourceTitle}` : '',
		context ? `Surrounding context:\n${context}` : '',
		`Highlighted passage to explain:\n"""${highlight}"""`
	]
		.filter(Boolean)
		.join('\n\n');

	// Opus 4.8 requires adaptive thinking; output_config.format gives structured JSON.
	// The installed SDK's types predate these fields, but the runtime API forwards
	// the body as-is, so we cast the params to satisfy the type-checker.
	const params = {
		model: 'claude-opus-4-8',
		max_tokens: 4000,
		thinking: { type: 'adaptive' },
		output_config: {
			effort: 'medium',
			format: { type: 'json_schema', schema: EXPLANATION_SCHEMA }
		},
		system: [
			{
				type: 'text',
				text: FRAMEWORK_SYSTEM,
				cache_control: { type: 'ephemeral' }
			}
		],
		messages: [{ role: 'user', content: userText }]
	};

	const response = await client.messages.create(/** @type {any} */ (params));

	// With output_config.format the JSON arrives as the text block. Find it and parse.
	const textBlock = response.content.find((/** @type {any} */ b) => b.type === 'text');
	if (!textBlock) {
		throw new Error('No text content returned from model');
	}
	return JSON.parse(/** @type {any} */ (textBlock).text);
}
