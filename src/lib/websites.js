/**
 * Websites I've designed and built, shown on /websites.
 * Screenshots live in static/websites/<id>.jpg (1200px wide, 16:10).
 * `project` links to an existing /projects/<id> case study when there is one.
 */

/**
 * @typedef {Object} Website
 * @property {string} id
 * @property {string} name
 * @property {string} url
 * @property {string} [client]
 * @property {string} [year]
 * @property {string} description
 * @property {string[]} stack
 * @property {string} [project]
 */

/** @type {Website[]} */
export const featuredSites = [
	{
		id: 'good-neighbor',
		name: 'Good Neighbor Record Creator',
		url: 'https://order-form.goodneighbormusic.com',
		client: 'Good Neighbor',
		year: '2025',
		description:
			'The order form for a low-carbon vinyl pressing plant. It works offline and syncs when you reconnect, shows a live 3D render of your record, generates cover art with AI, and sends every order straight into their CRM.',
		stack: ['SvelteKit', 'Three.js', 'Cloudflare D1 + R2', 'IndexedDB', 'Flux', 'Monday CRM'],
		project: 'goodneighbor'
	},
	{
		id: 'rec-center',
		name: 'Rec Center',
		url: 'https://officialofficehours.com/reccenter',
		client: 'Office Hours Live with Tim Heidecker',
		year: '2024',
		description:
			'Every recommendation from the hosts and guests of the Office Hours podcast, collected into a filterable rec center, with a button that gives you a random rec.',
		stack: ['Svelte', 'Vite', 'Cloudflare'],
		project: 'office-hours-rec-center'
	},
	{
		id: 'open-art-institute',
		name: 'Open Art Institute',
		url: 'https://openartinstitute.org',
		year: '2026',
		description:
			'An online platform for the free diffusion of art and ideas. Browse, search and save open-access works from museum collections around the world, with zoomable images, rights info and shareable links.',
		stack: ['React (Vinext)', 'Three.js', 'Cloudflare Workers', 'D1']
	},
	{
		id: 'repare',
		name: 'Repare',
		url: 'https://getrepare.com',
		year: '2026',
		description:
			'Fixes AI product images using the original renders as reference. Box a region on the render, box where it belongs in the AI image, and Gemini paints a matching patch that gets feathered in, with layers, outpainting and video generation.',
		stack: ['SvelteKit', 'Gemini', 'Veo', 'Three.js']
	},
	{
		id: 'scott-benzel',
		name: 'Scott Benzel',
		url: 'https://scottbenzel.net',
		client: 'Scott Benzel',
		year: '2026',
		description:
			'A portfolio and archive for the Los Angeles interdisciplinary artist: exhibitions, selected texts, video and an editable catalogue of works.',
		stack: ['Astro', 'EmDash CMS', 'Cloudflare Workers', 'D1 + R2']
	},
	{
		id: 'yaytso',
		name: 'yaytso',
		url: 'https://yaytso.art',
		description:
			'The home of yaytso gallery: posters, installations, shows and whatever weird stuff I hatch next.',
		stack: ['Astro', 'Cloudflare'],
		project: 'yaytso'
	},
	{
		id: 'flowers',
		name: 'Flowers',
		url: 'https://flowers.yaytso.art',
		year: '2024',
		description:
			'A Three.js viewer for flipping through 21 psychedelic AI lilies from the Flowers show at yaytso gallery.',
		stack: ['Three.js', 'Stable Diffusion', '8th Wall'],
		project: 'flowers'
	}
];

/** @type {Website[]} */
export const moreSites = [
	{
		id: 'pandaemonium-architecture',
		name: 'Pandaemonium Architecture 6.0',
		url: 'https://a211h.yaytso.art',
		client: 'CalArts · Scott Benzel',
		year: '2026',
		description:
			'The course site for a CalArts seminar on AI, cybernetics and art, which Scott Benzel teaches and I run the labs for. It holds the syllabus and a reader for the texts. Students get notes, highlights, a Claude assistant scoped to the reading, and a shared feed of highlights.',
		stack: ['SvelteKit', 'Cloudflare', 'Claude']
	},
	{
		id: 'abmnemonic',
		name: 'abmnemonic',
		url: 'https://abmnemonic.com',
		year: '2026',
		description:
			'The site for an institute studying memory reconsolidation: how a memory is re-encoded every time it is recalled.',
		stack: ['SvelteKit', 'Three.js']
	},
	{
		id: 'waifu-farmers',
		name: 'Waifu Farmers',
		url: 'https://waifufarmer.com',
		year: '2025',
		description:
			'A real-world collecting game. Find QR-coded treasures out in the world, claim an anime character and mint it onchain.',
		stack: ['SvelteKit', 'Cloudflare D1', 'Base']
	},
	{
		id: 'aespa',
		name: 'aespa — Better Things',
		url: 'https://betterthingsbyaespa.com',
		client: 'aespa × Hifi Labs',
		description:
			'An album activation where fans grew their own flower by listening, using thousands of AI variations of the album art.',
		stack: ['Next.js', 'Stable Diffusion', 'ComfyUI'],
		project: 'aespa'
	},
	{
		id: 'surv1val',
		name: 'SURV1VAL',
		url: 'https://surv1val.com',
		client: 'Mike Shinoda × Hifi Labs',
		description:
			"A game for Mike Shinoda's album where each player's monster grew stronger the more they listened.",
		stack: ['Next.js', 'Stable Diffusion', 'ComfyUI'],
		project: 'surv1val'
	},
	{
		id: 'tickets',
		name: 'Tickets',
		url: 'https://tickets.yaytso.art',
		description:
			'Event ticketing with a daily free-ticket giveaway, prices that rise on a curve as the date gets closer, and a custom Stripe checkout.',
		stack: ['SvelteKit', 'Cloudflare', 'Stripe'],
		project: 'tix'
	},
	{
		id: 'happy-friday',
		name: 'Happy Friday Coffee',
		url: 'https://happyfriday.coffee',
		client: 'Happy Friday Coffee',
		description:
			'An interactive store where you mint pieces of the logo to complete it, with a short run of coffee sold onchain through Shopify.',
		stack: ['Shopify', 'Base', 'NFTs'],
		project: 'happy-friday'
	},
	{
		id: 'egg-maker',
		name: 'yaytso egg maker',
		url: 'https://fab.yaytso.art',
		description:
			'A creative toy for making your own eggs from drawings and photos, saved to IPFS. Funded by a Filecoin Foundation grant.',
		stack: ['Three.js', 'IPFS'],
		project: 'yaytso-egg-maker'
	},
	{
		id: 'bao',
		name: "Bao's Haus",
		url: 'https://baos.haus',
		description: 'The website of Bao, a magical dog who makes chicken art.',
		stack: [],
		project: 'bao'
	}
];

/** Hostname + path without protocol or trailing slash, for display. */
export function displayUrl(url) {
	return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
