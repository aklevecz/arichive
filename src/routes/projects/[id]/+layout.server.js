import { projectsData } from '$lib/stores/projects.svelte';
import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({params}) {
	const project = projectsData.find((project) => project.id === params.id);
	if (!project) {
		error(404, 'Project not found');
	}
	return { id: params.id, project: project };
}
