import { error } from '@sveltejs/kit';

const modules = import.meta.glob('/src/lib/content/**/*.md');

/** @type {Record<string, () => Promise<any>>} */
const bySlug = {};
for (const [path, importer] of Object.entries(modules)) {
	const slug = path.split('/').pop()?.replace('.md', '') ?? '';
	bySlug[slug] = importer;
}

export async function load({ params }) {
	const importer = bySlug[params.slug];
	if (!importer) throw error(404, `Not found: ${params.slug}`);

	const post = await importer();
	return {
		component: post.default,
		meta: post.metadata ?? {}
	};
}
