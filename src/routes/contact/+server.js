import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	const key = url.searchParams.get('sliack');
	if (key !== 'meepo') {
		return new Response('Unauthorized', { status: 401 });
	}
    await new Promise((resolve) => setTimeout(resolve, 1000));
	return json({ email: 'ariel@yaytso.art', phone: '14159671642' });
}
