import { projectsData } from '$lib/stores/projects.svelte';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	const projectIds = projectsData.map((project) => ({
		id: project.id
	}));
	return projectIds;
}

export const prerender = true;
/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const project = projectsData.find((project) => project.id === params.id);
	if (!project) {
		error(404, 'Project not found');
	}
	return { id: params.id, project };
}
