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

/** @type {ProjectData[]} projectsData */
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
	// {
	// 	id: 'shrooms',
	// 	name: 'shrooms',
	// 	description: 'a collection of ai shrooms with ar stuff too',
	// 	descriptionLong: [`to be designd 🍄`],
	// 	url: 'https://yaytso.art',
	// 	categories: ['ai', 'digital art', 'ar', 'event']
	// },
	{
		id: 'yaytso-gallery',
		name: 'yaytso gallery',
		description: 'my space for trippy art',
		descriptionLong: [
			`The yaytso gallery is an evolving space of experimental art.`,
			`I use it to showcase my art and experiments with AI and AR.`,
			`Come as you are.`
		],
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
		descriptionLong: [
			`Bao is a magical dog who creates art.`,
			`I created a website for him to showcase his art and also created an augmented reality experience for people to see his art come to life.`
		],
		url: 'https://baos.haus',
		categories: ['ai', 'dogs', 'chicken art']
	},

	{
		id: 'boopers',
		name: 'boopers',
		description: 'Using nfc tags for booping stuff',
		descriptionLong: [
			`Currently skinned for a scavenger hunt at FWB fest the first weekend of August.`,
			`Boopers is a scavenger hunt where you find hidden nfc tags and boop them to get points.`,
			`The website will eventually keep track of your score and shows you a leaderboard of other boopers.`,
			`An iOS app for a better experience is under development.`
		],
		url: 'https://boopers.pages.dev',
		categories: ['scavenger hunts', 'nfc', 'booping']
	},
	// {
	// 	id: '8thwall-projects',
	// 	name: '8thwall projects',
	// 	description: 'a collection of projects using 8th wall to crate fun ar experiences',
	// 	descriptionLong: [
	// 		`8th wall is a powerful tool for creating augmented reality experiences.`,
	// 		`I have created a number of projects using 8th wall to create fun and interactive experiences.`
	// 	],
	// 	url: 'https://www.8thwall.com/yaytso',
	// 	categories: ['ar', '8th wall']
	// },
	// {
	// 	id: 'jung',
	// 	name: 'jung',
	// 	description: 'a collection of ai Jung with ar stuff too',
	// 	url: 'https://yaytso.art/events/jung',
	// 	categories: ['ai', 'digital art', 'ar', 'event']
	// },
	{
		id: 'qr-codes',
		name: 'QR codes',
		description: 'special QR codes made using ai',
		descriptionLong: [
			`QR codes that seem to bend the possibilities using Stable Diffusion ControlNets and IPAdapter.`,
			`Generated using various workflows in ComfyUI`,
			`Requires tinkering with parameters to find a balance between scannabiliy and aesthetics.`,
			`Tends to vary depending on what the prompt is generating.`
		],
		url: null,
		categories: ['ai', 'qr code'],
		hasGallery: true
	},
	{
		id: 'aespa',
		name: 'Aespa Better Things',
		description: 'Generated thousands of versions of their flower album art using AI',
		descriptionLong: [
			`Aespa is a popular Kpop group that has been making waves in the music industry.`,
			`I generated thousands of versions of their flower album art using AI.`,
			`The art was used for their Better Things album release, where fans listened to the album in order to help their flower flourish.`,
			`I also helped build this website as part of Hifi Labs.`
		],
		url: 'https://betterthingsbyaespa.com/',
		categories: ['ai', 'music', 'digital art'],
		hasGallery: true
	},
	{
		id: 'surv1val',
		name: 'Surv1val',
		description:
			"Generated thousands of versions of monsters for the Surv1val game for Mike Shinoda's album",
		descriptionLong: [
			`I generated thousands of versions of 9 different monsters for the Surv1val game for his album.`,
			`Each player was given a monster that they made stronger by interacting with Mike's music`,
			`At the end of the activation they were given the final version of their monster that I generated`,
			`I also helped build this website as part of Hifi Labs.`
		],
		url: 'https://surv1val.com',
		categories: ['ai', 'music', 'digital art'],
		hasGallery: true
	},
	// {
	// 	id: 'good-neighbor',
	// 	name: 'good neighbor',
	// 	description: 'creating animated album art for vinyl record covers',
	// 	url: 'https://yaytso.art/good-neightbor',
	// 	categories: ['music', 'digital art', 'vinyl record']
	// },
	{
		id: 'happy-friday',
		name: 'Happy Friday Coffee',
		description: 'An interactive ecommerce website for Happy Friday Coffee.',
		descriptionLong: [
			` Includes a fun NFT generator where you mint pieces of the logo in order to create a completed version of it.`,
			`The ecommerce component is still under construction, but there was a short run of selling coffee beans using Base crypto`,
			`It was an interesting problem to solve connecting a NFT contract to a Shopify backend`
		],
		url: 'https://happyfriday.coffee',
		categories: ['web', 'nft', 'ecommerce', 'coffee']
	},
	{
		id: 'nouns-in-the-park',
		name: 'Nouns in the Park',
		description: 'A collection of AI generated nouns in the park',
		descriptionLong: [
			`A 3D rendering of the Nouns noggles was taken and dissolved into a smoke simulation using Blender.`,
			`I took the smoke simulation and textured the animation using Stable Diffusion with a AnimateDiff workflow.`,
			`The workflow used IPAdapters and ControlNets to have the animation transition between cloud textured noggles into a mysical park`,
			`The animations were projected onto the trees in the park and people could interact with them using their phones.`
		],
		url: null,
		videoConfiguration: {
			host: 'https://fest-nouns.yaytso.art',
			maxId: 100
		},
		categories: ['ai', 'digital art', 'ar', 'ai']
	},
	{
		id: 'secret-clothing',
		name: 'Secret clothing store project',
		description:
			'Finetuned a Stable Diffusion XL model for a clothing brand in order to help them generate avant garde looks for their existing mundane stores',
		descriptionLong: [
			`Training images were generated by a creative director in Mid Journey.`,
			`There were about 60 training images used to finetune the model to generate the style`,
			`Images were upscaled using tiling techniques that use low denoise of a Stabe Diffusion 1.5 model on various parts of the image in order to add detail and upres the dimensions`
		],
		url: null,
		categories: ['ai', 'fashion', 'digital art', 'finetuning', 'lora'],
		hasGallery: true
	},
	{
		id: 'office-hours-rec-center',
		name: 'Office Hours Rec Center',
		description: 'A virtual rec center for Office Hours',
		descriptionLong: [
			`The Office Hours is a podcast hosted by Tim Heidecker that tends to embrace interactivity with their guests and supporters.`,
			`They started a ritual of collecting recommendations from the hosts and guests each episode.`,
			`At some point they expressed interest in creating a website to host this content, and I volunteered for the task`,
			`I built the website using SvelteKit and host it through an iframe on their SquareSpace site`
		],
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
