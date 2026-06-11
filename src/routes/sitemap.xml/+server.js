import { entries } from '$lib/content';
import projectToImages from '$lib/projectToImages.json';

const SITE = 'https://klevecz.net';

const staticPaths = ['/', '/projects', '/writing', '/gallery', '/ar', '/ai', '/burgers'];

/** @type {import('./$types').RequestHandler} */
export function GET() {
	const paths = [
		...staticPaths,
		...Object.keys(projectToImages).map((id) => `/projects/${id}`),
		...entries.filter((e) => !e.draft).map((e) => `/writing/${e.slug}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `\t<url><loc>${SITE}${p}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}
