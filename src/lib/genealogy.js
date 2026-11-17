/**
 * Starting content for the genealogy map at /genealogy.
 *
 * The page has its own editor: press Edit there to add bubbles, write content,
 * add references and connect things. Edits are kept in the browser; "Copy data"
 * in the editor gives you JSON in exactly this shape, which you can paste over
 * `defaultMap` below to make it permanent.
 *
 * @typedef {Object} Reference
 * @property {string} label What it is: a book, a record, a person, a show
 * @property {string} [url] Optional link
 *
 * @typedef {Object} Bubble
 * @property {string} id
 * @property {string} label Shown inside the bubble
 * @property {string} [text] Shown when the bubble is opened
 * @property {Reference[]} [refs]
 * @property {[number, number]} [pos] Where it was dragged to, as fractions of the frame
 *
 * @typedef {Object} GenealogyMap
 * @property {Bubble[]} nodes
 * @property {[string, string][]} links Pairs of bubble ids
 * @property {Bubble | null} [around] One bubble drawn around all the others: present in
 *   everything rather than connected to it
 */

/** @type {GenealogyMap} */
export const defaultMap = {
	nodes: [
		{
			id: 'school',
			label: "Psychology master's",
			text: "Going to school, getting a master's in psychology."
		},
		{
			id: 'sf',
			label: 'Tech and music community',
			text: 'Working in the tech industry and building a music community at the same time. This is where I started connecting music, psychology and my unconscious.'
		},
		{
			id: 'tickets',
			label: 'Tickets at the door',
			text: "Going to shows and noticing people stuck outside. Giving away tickets and observing people's changing behaviour."
		},
		{
			id: 'fired',
			label: 'Fired'
		},
		{
			id: 'flare',
			label: 'Flaring out'
		},
		{
			id: 'parties',
			label: 'Throwing parties',
			text: 'Bouncing between San Francisco and Los Angeles, throwing parties.'
		},
		{
			id: 'meowwolf',
			label: 'Meow Wolf',
			text: 'Ending up at Meow Wolf in Santa Fe.'
		},
		{
			id: 'la',
			label: 'Grounding',
			text: 'Back in Los Angeles, finding grounding and working in music.'
		},
		{ id: 'music', label: 'Music' },
		{ id: 'psychology', label: 'Psychology' },
		{ id: 'unconscious', label: 'The unconscious' },
		{
			id: 'technology',
			label: 'New technology',
			text: 'Bleeding-edge tech is something I continually gravitate around.'
		},
		{ id: 'gathering', label: 'Gathering people' },
		{
			id: 'access',
			label: 'Access',
			text: 'Who gets in, at what price, and who decides.'
		}
	],
	links: [
		['school', 'psychology'],
		['sf', 'technology'],
		['sf', 'music'],
		['sf', 'gathering'],
		['sf', 'unconscious'],
		['tickets', 'music'],
		['tickets', 'psychology'],
		['tickets', 'gathering'],
		['fired', 'unconscious'],
		['fired', 'technology'],
		['flare', 'unconscious'],
		['parties', 'gathering'],
		['parties', 'music'],
		['meowwolf', 'technology'],
		['meowwolf', 'gathering'],
		['la', 'music'],
		['la', 'technology'],
		['access', 'tickets'],
		['access', 'gathering']
	],
	around: {
		id: 'anima',
		label: 'Anima',
		text: 'Present in everything. A lens arrived at in November 2026 and read backwards over the rest; not an origin.',
		refs: [{ label: 'C. G. Jung' }]
	}
};
