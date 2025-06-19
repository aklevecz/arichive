<script>
	import filter from '$lib/stores/filter.svelte';
	import projects from '$lib/stores/projects.svelte';

	let showFilters = $state(false);
</script>

<div class="container">
	{#if !showFilters}
		<button class="btn" onclick={() => (showFilters = true)} style="margin:.5rem;width:120px;"
			>Show Filters</button
		>
		<div class="category-nugget-container">
			{#each projects.categories.filter( (category) => filter.state.categories.includes(category) ) as category}
				<button
					onclick={() => filter.toggleCategory(category)}
					class="category-nugget"
					class:active={filter.state.categories.includes(category)}
					>{category}
				</button>
			{/each}
		</div>
	{/if}
	{#if showFilters}
		<button class="btn" onclick={() => (showFilters = false)} style="margin:.5rem;width:120px;"
			>Hide Filters</button
		>
		<div class="category-nugget-container">
			{#each projects.categories as category}
				<button
					onclick={() => filter.toggleCategory(category)}
					class="category-nugget"
					class:active={filter.state.categories.includes(category)}
					>{category}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		margin-top: 1.25rem;
		margin-left: 1rem;
	}
	.category-nugget-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.5rem;
		margin-top: 1rem;
	}
	.category-nugget.active {
		background-color: rgba(var(--accent-color), 0.75);
		color: var(--secondary-color);
	}
	button {
		border-radius: 20px;
	}
	@media (min-width: 1200px) {
		.container {
			/* margin-left: 0.75rem; */
		}
	}
</style>
