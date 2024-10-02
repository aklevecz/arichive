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
		name: 'Flowers',
		description:
			'A series of psychedelic AI generated flowers with their own deforum animations. Brought to life through posters with image tracking AR for a interactive gallery show',
		descriptionLong: [
			`The flowers show was held on June 15th 2024 as the first official show at yaytso gallery featuring Ariel Klevecz and Remi Frogo.`,
			`Hundreds of lillies were generated using Stable Diffusion XL. 21 of them were selected and then upscaled and outpainted to an aspect ratio to fit a poster.`,
			`Each lily was then run through similar prompts using deforum to create a trippy immersive animation.`,
			`Each flower was printed and wheat pasted onto a wooden canvas board to bring it into the real world and give it an organic feel.`,
			`You can see the animations overlayed on the physical flowers using the augmented reality app on 8thwall.`,
			`I also created a experimental version of the AR experience in VisionOS, which was by far the best experience, but still needs to be refined.`,
			`Technology used: Stable Diffusion, 8th Wall, Swift (ARKit, VisionOS), JavaScript, Cloudflare Workers`
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
			`Locaed at Lacy Studio Lofts in Los Angeles CA`,
			`Come as you are.`
		],
		url: 'https://yaytso.art/about',
		categories: ['art', 'gallery']
	},
	{
		id: 'yaytso-egg-maker',
		name: 'yaytso egg maker',
		description: 'a silly creative toy for making producing your own unique eggs',
		descriptionLong: [
			`The yaytso egg maker is a tool for making eggs that can be minted as a NFT.`,
			`You can upload an image or draw on a blank egg and bring your creative eggnergy into the world.`,
			`Once you are happy with your egg you can save it, where it is then uploaded to IPFS. If you feel like immortalizing it as an NFT you can go ahead and pay some gas`,
			`This project was funded by a grant from Filecoin Foundation`,
			`Technology used: React.js, Solidity, IPFS, Three.js, Firebase`
		],
		url: 'https://fab.yaytso.art',
		categories: ['3d', 'nft', 'eggs']
	},
	{
		id: 'remi',
		name: 'Remi Frogo',
		description: "supporting Remi Frogo's art with AR and web experiences",
		descriptionLong: [
			`Remi Frogo is a talented artist who creates beautiful paintings that have a wonderful balance of realism and mysticism.`,
			`She was a resident in yaytso gallery during the summer where she designed beautiful branding elements and painted original pieces`,
			`I created a website for her to showcase her art and also created an augmented reality experience for people to see her paintings come to life.`,
			`Technology used: Astro, 8th Wall, JavaScript, Cloudflare Workers`
		],
		url: 'https://remifrogo.art',
		categories: ['web', 'ai', 'ar', 'fine art', 'paintings']
	},
	{
		id: 'bao',
		name: 'Bao',
		description: 'making art with bao the magical dog',
		descriptionLong: [
			`Bao is a magical dog who creates chicken art.`,
			`I created a website for him to showcase his art and also created an augmented reality experience for people to see his art come to life.`,
			`Technology used: SvelteKit, 8th Wall, JavaScript, Open AI GPT-4 RAG functionality, Cloudflare Workers`
		],
		url: 'https://baos.haus',
		categories: ['ai', 'dogs', 'chicken art']
	},

	{
		id: 'boopers',
		name: 'Boopers',
		description: 'Using nfc tags for interative scavenger hunts',
		descriptionLong: [
			`Currently skinned for a scavenger hunt that took place at FWB fest in August 2024.`,
			`In the hunt at FWB fest people were prompted to find four fragments to complete a puzzle`,
			`Each fragment was shown on the map at a different area in the festival grounds. Once they found one and booped it, they were shown the location of the next one`,
			`Once they had found each fragment and completed the set, they were prompted to look at the puzzle through an AR lens to see their own unique animation`,
			`All fragments were NFTs minted on Base, including the final animation`,
			`There was additionally a side quest to find random little eggs that had different point values. The group that got the most points won 0.5 Base Ethereum`,
			`An iOS app for a better experience is under development.`,
			`Technology used: SvelteKit, 8th Wall, JavaScript, Cloudflare Workers, Solidity, Base Ethereum, Stable Diffusion XL, Deforum, AnimateDiff`
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
			`Tends to vary depending on what the prompt is generating.`,
			`Technology used: Stable Diffusion, ComfyUI, ControlNets, IPAdapter`
		],
		url: null,
		categories: ['ai', 'qr code'],
		hasGallery: true,
		imgConfiguration: {
			width: '400px'
		}
	},
	{
		id: 'aespa',
		name: 'Aespa Better Things',
		description: 'Generated thousands of versions of their flower album art using AI',
		descriptionLong: [
			`Aespa is a popular K-pop group that has been making waves in the music industry.`,
			`I generated thousands of versions of their flower album art using AI.`,
			`The art was used for their Better Things album release, where fans listened to the album in order to help their flower flourish.`,
			`I also helped build the website for the activation as part of Hifi Labs.`,
			`Technology used: Next.js, Stable Diffusion, ComfyUI, ControlNets`
		],
		url: 'https://betterthingsbyaespa.com/',
		categories: ['ai', 'music', 'digital art'],
		hasGallery: true
	},
	{
		id: 'surv1val',
		name: 'Surv1val',
		description:
			"The Surv1val game for Mike Shinoda's latest album. An interactive game where people battled with their own monsters and witnessed them grow into their final form",
		descriptionLong: [
			`I generated thousands of versions of 9 different monsters for the Surv1val game for his album.`,
			`Each player was given a monster that they made stronger by interacting with Mike's music`,
			`At the end of the activation they were given the final version of their monster that I generated`,
			`I also helped build this website as part of Hifi Labs.`,
			`Technology used: Next.js, Stable Diffusion, ComfyUI, ControlNets`
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
			`Includes a fun NFT generator where you mint pieces of the logo in order to create a completed version of it.`,
			`The ecommerce component is still under construction, but there was a short run of selling coffee beans using Base Ethereum`,
			`It was an interesting problem to solve connecting a NFT contract to a Shopify backend`,
			`Technology used: SvelteKit, Solidity, Base Ethereum, Shopify`
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
	// {
	// 	id: 'secret-clothing',
	// 	name: 'Secret clothing store project',
	// 	description:
	// 		'Finetuned a Stable Diffusion XL model for a clothing brand in order to help them generate avant garde looks for their existing mundane stores',
	// 	descriptionLong: [
	// 		`Training images were generated by a creative director in Mid Journey.`,
	// 		`There were about 60 training images used to finetune various models experimenting with both LoRA and finetuning Stable Diffusion 1.5 and XL to generate the style`,
	// 		`Images were upscaled using tiling techniques that use low denoise of a Stabe Diffusion 1.5 model on various parts of the image in order to add detail and upres the dimensions`,
	// 		`This project is still under development, so image colors are obscured and any images that reveal the brand are not being displayed.`,
	// 		`Technology used: Stable Diffusion, LoRA`

	// 	],
	// 	url: null,
	// 	categories: ['ai', 'fashion', 'digital art', 'finetuning', 'lora'],
	// 	hasGallery: true
	// },
	{
		id: 'office-hours-rec-center',
		name: 'Office Hours Rec Center',
		description: 'A virtual rec center for Office Hours',
		descriptionLong: [
			`The Office Hours is a podcast hosted by Tim Heidecker that tends to embrace interactivity with their guests and supporters.`,
			`They started a ritual of collecting recommendations from the hosts and guests each episode.`,
			`At some point they expressed interest in creating a website to host this content, and I volunteered for the task`,
			`I built the website using SvelteKit and host it through an iframe on their SquareSpace site`,
			`Technology used: SvelteKit, JavaScript, Cloudflare Workers`
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
