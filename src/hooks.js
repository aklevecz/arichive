/**
 * genealogy.klevecz.net shows the genealogy map at its root.
 * Every other host is untouched.
 *
 * @type {import('@sveltejs/kit').Reroute}
 */
export function reroute({ url }) {
	if (url.hostname.startsWith('genealogy.') && url.pathname === '/') return '/genealogy';
}
