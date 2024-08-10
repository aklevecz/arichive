import Fuse from 'fuse.js';
import projects from './projects.svelte';
import filter from './filter.svelte';

function createSearchStore() {
	/** @type {{query: string, results:import('fuse.js').FuseResult<Project>[], resultsIds:string[]}} */
	const search = $state({ query: '', results: [], resultsIds: [] });

	return {
		get state() {
			return search;
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
			search.resultsIds = search.results.map((result) => result.item.id);
		}
	};
}
const search = createSearchStore();
export default search;
