/**
 * notes
 * add vision pro?
 * add lots of content for each project?
 * have a folder for each project and collect all of its assets and lay them out in a component?
 *
 */

import filter from './filter.svelte';
import search from './search.svelte';

export const projectsData = [
	{
		id: 'flowers',
		name: 'flowers',
		description: 'a collection of ai flowers with ar stuff too',
		url: 'https://yaytso.art/events/flowers-1',
		categories: ['ai', 'digital art', 'ar', 'event']
	},
	{
		id: 'shrooms',
		name: 'shrooms',
		description: 'a collection of ai shrooms with ar stuff too',
		url: 'https://yaytso.art/events/shrooms',
		categories: ['ai', 'digital art', 'ar', 'event']
	},
	{
		id: 'yaytso',
		name: 'yaytso',
		description: 'my space for trippy art',
		url: 'https://yaytso.art',
		categories: ['art', 'gallery']
	},
	{
		id: 'remi',
		name: 'remi',
		description: "supporting remi frogo's art with AR and web experiences",
		url: 'https://remifrogo.art',
		categories: ['web', 'ai', 'ar', 'fine art', 'paintings']
	},
	{
		id: 'bao',
		name: 'bao',
		description: 'making art with bao the magical dog',
		url: 'https://baos.haus',
		categories: ['ai', 'dogs', 'chicken art']
	},
	{
		id: 'good-neighbor',
		name: 'good neighbor',
		description: 'creating animated album art for vinyl record covers',
		url: 'https://yaytso.art/good-neightbor',
		categories: ['music', 'digital art', 'vinyl record']
	},
	{
		id: 'boopers',
		name: 'boopers',
		description: 'using nfc tags for booping stuff',
		url: 'https://yaytso.art/boopers',
		categories: ['scavenger hunts', 'nfc', 'booping']
	},
	{
		id: 'jung',
		name: 'jung',
		description: 'a collection of ai Jung with ar stuff too',
		url: 'https://yaytso.art/events/jung',
		categories: ['ai', 'digital art', 'ar', 'event']
	},
	{
		id: 'qr-codes',
		name: 'QR codes',
		description: 'special QR codes made using ai',
		url: 'https://yaytso.art/qr-codes',
		categories: ['ai', 'qr code']
	},
	{
		id: 'aespa',
		name: 'Aespa Better Things',
		description: 'Generated thousands of versions of their flower album art using AI',
		url: 'betterthings.aespa.com',
		categories: ['ai', 'music', 'digital art']
	},
	{
		id: 'nouns-in-the-park',
		name: 'Nouns in the Park',
		description: 'A collection of AI generated nouns in the park',
		url: 'https://yaytso.art/events/nouns-in-the-park',
		categories: ['ai', 'digital art', 'ar', 'ai']
	}
];

/** @type {string[]} allCategories */
let allCategories = [];
for (const project of projectsData) {
	for (const category of project.categories) {
		if (!allCategories.includes(category)) {
			allCategories.push(category);
		}
	}
}

const createProjectsStore = () => {
	/** @type {Project[]} projects */
	const projects = $state([...projectsData]);
	const categories = $state(allCategories.sort((a, b) => a.localeCompare(b)));

	return {
		get state() {
			return projects;
		},
		/** @param {Project} project */
		searchFilter(project) {
			if (search.state.resultsIds.length === 0) {
				return true;
			}
			return search.state.resultsIds.includes(project.id);
		},
		/** @param {Project} project */
		categoryFilter(project) {
			if (filter.state.categories.length === 0) {
				return true;
			}
			return filter.state.categories.every((filterCategory) =>
				project.categories.includes(filterCategory)
			);
		},
		get categories() {
			return categories;
		}
	};
};

const projects = createProjectsStore();
export default projects;
