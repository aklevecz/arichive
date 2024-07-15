import Fuse from 'fuse.js';
import projects from './projects.svelte';

function createSearchStore() {
	/** @type {{query: string, results:import('fuse.js').FuseResult<Project>[]}} */
	const search = $state({ query: '', results: [] });

	return {
		get state() {
			return search;
		},
		get hasSearchResults() {
			return search.results.length;
		},
		/** @param {string} updatedText */
		updateQuery(updatedText) {
			const fuse = new Fuse(projects.state, {
				includeScore: true,
				keys: ['name', 'description', 'categories']
			});
			search.query = updatedText;
			const results = fuse.search(search.query);
			search.results = results.filter((result) => result.score && result.score < 0.5);
		}
	};
}
const search = createSearchStore();
export default search;
