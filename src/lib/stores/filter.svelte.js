function createFilterStore() {
	/** @type {{categories:string[]}} */
	const filters = $state({ categories: [] });

	return {
		get state() {
			return filters;
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
