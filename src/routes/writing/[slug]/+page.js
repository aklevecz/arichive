import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

const modules = import.meta.glob('/src/lib/content/**/*.md');

/** @type {Record<string, { importer: () => Promise<any>, section: string }>} */
const bySlug = {};
for (const [path, importer] of Object.entries(modules)) {
	const slug = path.split('/').pop()?.replace('.md', '') ?? '';
	const section = path.includes('/content/research/') ? 'research' : 'writing';
	bySlug[slug] = { importer, section };
}

export async function load({ params }) {
	const entry = bySlug[params.slug];
	if (!entry) throw error(404, `Not found: ${params.slug}`);

	const post = await entry.importer();
	// Drafts are reachable in dev only
	if (!dev && post.metadata?.draft) throw error(404, `Not found: ${params.slug}`);
	return {
		component: post.default,
		meta: { section: entry.section, ...(post.metadata ?? {}) }
	};
}
