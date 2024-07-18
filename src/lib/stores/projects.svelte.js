/**
 * notes
 * add vision pro?
 * add lots of content for each project?
 * have a folder for each project and collect all of its assets and lay them out in a component?
 *
 */

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
		description: 'a space for trippy art',
		url: 'https://yaytso.art',
		categories: ['ai', 'art', 'gallery']
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
	}
];

const createProjectsStore = () => {
	/** @type {Project[]} projects */
	const projects = $state([...projectsData]);

	return {
		get state() {
			return projects;
		}
	};
};

const projects = createProjectsStore();
export default projects;
