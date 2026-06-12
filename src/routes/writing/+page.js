import { dev } from '$app/environment';
import { writing, research } from '$lib/content';

// Drafts are visible while developing but never on the deployed site.
export function load() {
	/** @param {import('$lib/content').Entry[]} list */
	const visible = (list) => (dev ? list : list.filter((e) => !e.draft));
	return { writing: visible(writing), research: visible(research) };
}
