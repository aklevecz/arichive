import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const key = url.searchParams.get('sliack');
	if (!env.CONTACT_KEY || key !== env.CONTACT_KEY) {
		return new Response('Unauthorized', { status: 401 });
	}
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return json({ email: env.CONTACT_EMAIL, phone: env.CONTACT_PHONE });
}
