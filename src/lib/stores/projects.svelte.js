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
			'A series of psychedelic AI generated flowers with their own deforum animations. Brought to life through posters with image tracking AR for a interactive gallery show. The webpage to the right is a fun ThreeJS viewer for flipping through each poster.',
		descriptionLong: [
			`The flowers show was held on June 15th 2024 as the first official show at yaytso gallery featuring Ariel Klevecz and Remi Frogo.`,
			`Hundreds of lillies were generated using Stable Diffusion XL. 21 of them were selected and then upscaled and outpainted to an aspect ratio to fit a poster.`,
			`Each lily was then run through similar prompts using deforum to create a trippy immersive animation.`,
			`Each flower was printed and wheat pasted onto a wooden canvas board to bring it into the real world and give it an organic feel.`,
			`You can see the animations overlayed on the physical flowers using the augmented reality app on 8thwall.`,
			`I also created a experimental version of the AR experience in VisionOS, which was by far the best experience, but still needs to be refined.`,
			`Technology used: Stable Diffusion, 8th Wall, Swift (ARKit, VisionOS), JavaScript, Cloudflare Workers`
		],
		url: ['https://flowers.yaytso.art'],
		categories: ['ai', 'digital art', 'ar', 'event']
	},
	{
		id: 'tix',
		name: 'Tickets V2',
		description: 'Ticketing web app including giveaways and bonding curve-esque pricing',
		descriptionLong: [
			`I built a newer version of my past ticketing app with improved coding patterns that allowed me to more easily scale its features.`,
			`WIN TIX takes you to a page where each day there is a free ticket available at a random time to the first person to press the button at that random time.`,
			`Base ticket prices increased on a quadratic curve in 1ct increments encouraging people to buy earlier because ticket prices rise exponentially as the event approaches.`,
			`Prices are additionally on a sliding scale and can be discounted with a code.`,
			`Tickets are purchased through a custom checkout using the Stripe API.`,
			`When someone either bought or won a ticket, a silly image is generated and applied as their profile picture.`,
			`They can see their profile and also see the QR codes for their tickets by signing in using their phone number.`
		],
		url: ['https://tix.raptor.pizza', 'https://tickets.yaytso.art'],
		categories: ['web', 'ticketing', 'sveltekit', 'cloudflare', 'stripe', 'ar', 'events']
	},
	{
		id: 'goodneighbor',
		name: 'Good Neighbor Order Form',
		description: `A custom order form for good neighbor music to improve their record pipeline and customer relationship through creative touches and nice data persistence UX`,
		descriptionLong: [
			`Good Neighbor is a ecoloigcally friendly record pressing company that uses innovative injection technology to produce records at a fraction of the carbon footprint of traditional vinyl.`,
			`They asked me if I could build an improved version of their Google intake form, and so I got incredibly carried away and baked a bunch of creative and bleeding edge web app technology into it.`,
			`I had always wanted to explore offline mode for a site, so I built a service worker and utilized the indexed db to persist form data in the browser that functions without an internet connection and will even send any changes made once internet connection is restored`,
			`The form also saves remotely on submission and at a particular interval after each change where data is sent to a SQL database and the Monday CRM.`,
			`For posterity I implemented the concept of a Project so that each form exists in its own project and a user can create multiple projects and switch between them`,
			`The spinning album cover is rendered using Three.js and is interactive, allowing the user to upload an image or generate on using Flux in the dream section`
		],
		url: ['https://order-form.goodneighbormusic.com'],
		categories: ['web', 'music', 'digital art', 'sveltekit', 'cloudflare', 'ai']
	},
	{
		id: 'live-visuals',
		name: 'Live TouchDesigner Visuals',
		description: `Live audio reactive visuals textured with ai at 30fps using Stream Diffusion`,
		descriptionLong: [
			`I threw a party in SF on 5/2/2025 where I booked DJs and set up live visuals using TouchDesigner and XBox Kinect.`,
			`I had one computer receiving the audio from the DJ controller and performing all of the audio analysis and another computer receiving the analysis over UDP and running all of the visuals`,
			`The visual pipeline started with the simple player index from the Kinect that was then textured with noise and run through the Stream Diffusion pipeline`,
			`From there the prompt and the amount of denoising could be manipulated live to create novel effects throughout the party. One super fun aspect of the event was people slowly figuring out that they could come behind the curtain and realize their own silly/trippy ideas.`
		],
		url: [],
		videoUrls: [
			'live-visuals-krg.mp4',
			'live-visuals2.mp4',
			'live-visuals3.mp4',
			'live-visuals4.mp4',
			'live-visuals5.mp4',
			'live-visuals6.mp4',
			'live-visuals7.mp4'
		],
		categories: ['ai', 'digital art', 'audio reactive', 'touchdesigner']
	},
	{
		id: 'office-hours-rec-center',
		name: 'Office Hours Rec Center',
		description: 'A virtual rec center for the Office Hours podcast',
		descriptionLong: [
			`The Office Hours podcast started a ritual of collecting recommendations from the hosts and guests at the end of each episode.`,
			`At some point they expressed interest in creating a website to host and organize the content so I volunteered to create the site`,
			`I built the website using SvelteKit and host it through an iframe on their SquareSpace site`,
		],
		url: ['https://officialofficehours.com/reccenter'],
		categories: ['web', 'office hours', 'sveltekit', 'cloudflare']
	},
	{
		id: 'raptor-app',
		name: 'Raptor App',
		description: 'An iOS app to see tickets for an event and visualize AR artwork',
		descriptionLong: [
			`The Raptor App is an iOS app written in Swift that allows an event goer to see their purchased/won tickets and provides a camera to interact with AR artwork`,
			`The app uses ARKit to image track posters present at the party and superimpose a trippy video on top of them to bring them to life.`,
			`The app also fetches the tickets for the party the person is attending for easy check in`,
			`Eventually the app will display a collection related to the person's attendance and easter eggs they have found`
		],
		// url:['https://apps.apple.com/us/app/raptor-app/id6741381341'],
		url: ['https://app.raptor.pizza'],
		categories: ['ios', 'ar', 'events', 'ticketing']
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
		id: 'yaytso',
		name: 'yaytso',
		description: 'yaytso means egg',
		descriptionLong: [
			`I'm always trying to hatch weird stuff`,
		],
		url: ['https://yaytso.art'],
		categories: ['egg', 'events', 'art', 'ai']
	},
	{
		id: 'yaytso-egg-maker',
		name: 'yaytso egg maker',
		description: 'a silly creative toy for making producing your own unique eggs',
		descriptionLong: [
			`I created the egg maker in a NFT hackathon and continued playing with it as a creative toy for making your own egg art.`,
			`You can upload an image or draw on the small canvas, and then create patterns from those textures.`,
			`Once you are happy with your egg you can save it, where it is then uploaded to IPFS. If you feel like immortalizing it as an NFT you can go ahead and pay some gas`,
			`This project was funded by a grant from Filecoin Foundation.`,
		],
		url: ['https://fab.yaytso.art'],
		categories: ['3d', 'nft', 'eggs', 'react', 'ipfs', 'ethereum']
	},
	{
		id: 'remi',
		name: 'Remi Frogo',
		description: "A site for Remi to show off her art and tattoos, designed by Remi",
		descriptionLong: [
			`Remi Frogo is an incredible painter and designer who creates a wonderful balance of realism and mysticism in her work.`,
		],
		url: ['https://remifrogo.art'],
		categories: ['web', 'ai', 'ar', 'fine art', 'paintings', 'astro']
	},
	{
		id: 'instabao',
		name: 'instaBao',
		description: "an iOS app to follow Bao's life",
		descriptionLong: [
			`You can chat with Bao`,
			`You can see photos of Bao throughout his illustrious life`,
			`And you can see him through AR do weird stuff`
		],
		url: ['https://insta.baos.haus'],
		categories: ['ios', 'ar', 'art', 'llm', 'instagram']
	},
	{
		id: 'bao',
		name: 'Bao',
		description: `Bao's website`,
		descriptionLong: [
			`Bao is a magical dog who creates chicken art.`,
		],
		url: ['https://baos.haus'],
		categories: ['ai', 'dogs', 'chicken art']
	},
	{
		id: 'iboopers',
		name: 'iBoopers',
		description: 'iOS app that uses nfc tags for interative scavenger hunts',
		descriptionLong: [
			`You search for eggs that give different amounts of points.`
		],
		url: ['https://iboopers.com'],
		categories: ['ios', 'nfc', 'eggs', 'games']
		// hasGallery: true
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
		url: ['https://boopers.pages.dev'],
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
	// 	url: ['https://www.8thwall.com/yaytso'],
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
		url: [],
		categories: ['ai', 'qr code'],
		hasGallery: true,
		imgConfiguration: {
			width: '350px',
			height: '350px'
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
		url: ['https://betterthingsbyaespa.com/'],
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
		url: ['https://surv1val.com'],
		categories: ['ai', 'music', 'digital art', 'nft'],
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
		],
		url: ['https://happyfriday.coffee'],
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
		url: [],
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
		id: 'wovn',
		name: 'Wovn formely known as Artifactor',
		description: 'A platform for NFT artists to understand and support their fanbase',
		descriptionLong: [
			`The Wovn platform was a platform for NFT artists to understand and support their fanbase.`,
			`Artists would connect their wallet address and then their profile would automatically populate from their activity on the blockchain.`,
			`I built the fullstack MVP using Next.js`
		],
		url: ['https://wovn.xyz'],
		categories: ['web', 'nft']
	},
	// {
	// 	id: 'google-search-site',
	// 	name: 'Google Search Site',
	// 	description: 'A performant marketing site I worked on at Left Field Labs',
	// 	descriptionLong: [
	// 		'Technology used: Lit and EJS'
	// 	],
	// 	url: ['https://search.google'],
	// 	categories: ['web'],
	// 	hasGallery: true
	// }
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
	/** @type {ProjectData[]} projects */
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
