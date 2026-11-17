/**
 * genealogy.klevecz.net is only the genealogy map: any other page of the site
 * asked for on that host goes back to its root.
 *
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
	const { url, route } = event;
	if (url.hostname.startsWith('genealogy.') && route.id && route.id !== '/genealogy') {
		return new Response(null, { status: 302, headers: { location: '/' } });
	}
	return resolve(event);
}
