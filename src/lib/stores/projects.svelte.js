/**
 * notes
 * add vision pro?
 * add lots of content for each project?
 * have a folder for each project and collect all of its assets and lay them out in a component?
 *
 */

import filter from './filter.svelte';
import search from './search.svelte';
/**
 * history
 * yaytso egg maker
 * myosin bullshit
 */

/**
 * CATEGORIES
 * AI
 * AR
 * VISION PRO
 */
export const projectsData = [
	{
		id: 'flowers',
		name: 'flowers',
		description: 'a collection of ai flowers with ar stuff too',
		descriptionLong: [
			`21 trippy ai flowers were chosen from a larger generated collection.`,
			`Generations were extended to poster aspect ratios and deforum animations were created for each one.`,
			`Each flower was printed and wheat pasted onto a wooden canvas board to bring it into the real world and give it an organic feel.`,
			`You can see the animations overlayed on the physical flowers using the augmented reality app on 8thwall.`
		],
		url: 'https://yaytso.art/events/flowers-1',
		categories: ['ai', 'digital art', 'ar', 'event']
	},
	{
		id: 'shrooms',
		name: 'shrooms',
		description: 'a collection of ai shrooms with ar stuff too',
		descriptionLong: [`to be designd 🍄`],
		url: 'https://yaytso.art',
		categories: ['ai', 'digital art', 'ar', 'event']
	},
	{
		id: 'yaytso-gallery',
		name: 'yaytso gallery',
		description: 'my space for trippy art',
		descriptionLong: [`The yaytso gallery is an evolving space of experimental art.`],
		url: 'https://yaytso.art',
		categories: ['art', 'gallery']
	},
	{
		id: 'yaytso-egg-maker',
		name: 'yaytso egg maker',
		description: 'a tool for making eggs',
		descriptionLong: [
			`The yaytso egg maker is a tool for making eggs.`,
			`You can upload an image or draw on a blank egg and bring your creative eggnergy into the world.`,
			`You can even mint your egg as an NFT and share it with the world.`
		],
		url: 'https://fab.yaytso.art',
		categories: ['3d', 'nft', 'eggs']
	},
	{
		id: 'remi',
		name: 'remi',
		description: "supporting remi frogo's art with AR and web experiences",
		descriptionLong: [
			`Remi Frogo is a talented artist who creates beautiful paintings and fine art.`,
			`I created a website for her to showcase his art and also created an augmented reality experience for people to see her paintings come to life.`
		],
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
		url: 'https://betterthingsbyaespa.com/',
		categories: ['ai', 'music', 'digital art']
	},
	{
		id: 'surv1val',
		name: 'Surv1val',
		description:
			"Generated thousands of versions of monsters for the Surv1val game for Mike Shinoda's album",
		url: 'https://surv1val.com',
		categories: ['ai', 'music', 'digital art']
	},
	{
		id: 'good-neighbor',
		name: 'good neighbor',
		description: 'creating animated album art for vinyl record covers',
		url: 'https://yaytso.art/good-neightbor',
		categories: ['music', 'digital art', 'vinyl record']
	},
	{
		id: 'happy-friday',
		name: 'Happy Friday Coffee site',
		description:
			'A website for Happy Friday Coffee. Includes a fun NFT generator where you mint pieces of the logo in order to create a completed version of it. Ecommerce component under construction, but there was a short run of selling coffee beans using Base crypto',
		url: 'https://happyfriday.coffee',
		categories: ['web', 'nft', 'ecommerce', 'coffee']
	},
	{
		id: 'nouns-in-the-park',
		name: 'Nouns in the Park',
		description: 'A collection of AI generated nouns in the park',
		url: 'https://yaytso.art/events/nouns-in-the-park',
		categories: ['ai', 'digital art', 'ar', 'ai']
	},
	{
		id: 'under-armour',
		name: 'Secret clothing store project',
		description:
			'Finetuning a stable diffusion model for a clothing brand in order to help them generate avant garde looks for their existing mundane stores',
		url: 'https://yaytso.art/under-armour',
		categories: ['ai', 'fashion', 'digital art', 'finetuning', 'lora']
	},
	{
		id: 'office-hours-rec-center',
		name: 'Office Hours Rec Center',
		description: 'A virtual rec center for Office Hours',
		url: 'https://officialofficehours.com/reccenter',
		categories: ['web', 'office hours']
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
