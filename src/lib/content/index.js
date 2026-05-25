/**
 * Loads writing & research entries authored as markdown in src/lib/content.
 * Each .md file uses frontmatter: title, date, description, draft (optional).
 * The section is derived from the folder the file lives in.
 *
 * @typedef {Object} Entry
 * @property {string} slug
 * @property {'writing' | 'research'} section
 * @property {string} title
 * @property {string} date
 * @property {string} [description]
 * @property {boolean} [draft]
 */

const modules = import.meta.glob('/src/lib/content/**/*.md', { eager: true });

/** @returns {Entry} */
function toEntry(/** @type {string} */ path, /** @type {any} */ mod) {
	const slug = path.split('/').pop()?.replace('.md', '') ?? '';
	const section = path.includes('/content/research/') ? 'research' : 'writing';
	return { slug, section, ...mod.metadata };
}

/** @type {Entry[]} */
export const entries = Object.entries(modules)
	.map(([path, mod]) => toEntry(path, mod))
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const writing = entries.filter((e) => e.section === 'writing');
export const research = entries.filter((e) => e.section === 'research');
