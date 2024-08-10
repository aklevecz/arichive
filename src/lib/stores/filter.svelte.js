import projects from './projects.svelte';

function createFilterStore() {
	/** @type {{categories:string[]}} */
	const filters = $state({ categories: [] });

	return {
		get state() {
			return filters;
		},
		// IM NOT USING THIS
		get filteredProjects() {
			if (filters.categories.length === 0) {
				return projects.state;
			}
			return projects.state.filter((project) => {
				for (const category of filters.categories) {
					if (!project.categories.includes(category)) {
						return false;
					}
				}
				return true;
			});
			// return projects.state.filter((project) => {
			// 	return filters.categories.every((category) => project.categories.includes(category));
			// });
			// return projects.state.filter((project) => {
			// 	return project.categories.some((category) => filters.categories.includes(category));
			// });
		},
		/** @param {string} category */
		toggleCategory(category) {
			if (filters.categories.includes(category)) {
				filters.categories = filters.categories.filter((c) => c !== category);
			} else {
				filters.categories = [...filters.categories, category];
			}
		},
        resetFilters() {
            filters.categories = [];
        }
	};
}
const filter = createFilterStore();
export default filter;
