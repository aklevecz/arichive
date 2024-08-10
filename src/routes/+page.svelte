<script>
	import ApplyFilters from '$lib/components/apply-filters.svelte';
	import Header from '$lib/components/header.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import filter from '$lib/stores/filter.svelte';
	import projects from '$lib/stores/projects.svelte';

	let filteredProjects = $derived(
		projects.state.filter(projects.searchFilter).filter(projects.categoryFilter)
	);
</script>

<div class="container">
	<div class="stack header-search-wrapper">
		<Header />
		<SearchBar />
		<ApplyFilters />
	</div>
	<div class="content">
		<div
			style="margin-top:1rem; padding:.5rem;border: 3px solid var(--secondary-color); width: 100%;"
		>
			{#snippet projectLine(/** @type {Project} */ project)}
				<a
					href={`/projects/${project.name}`}
					style="display:block; justify-content:space-between; margin-bottom:.5rem;"
				>
					<div style="flex: 1 0 50%;">{project.name}</div>
					<div style="display:flex; align-items:center; gap:.5rem;margin-top:.2rem;">
						{#each project.categories as category}
							<div class="category-nugget" style="">
								{category}
							</div>
						{/each}
					</div>
				</a>
			{/snippet}
			<!-- {#if search.hasSearchResults}
				{#each search.state.results as project}
					{@render projectLine(project.item)}
				{/each}
			{:else} -->
			{#if filteredProjects.length === 0}
				<div style="padding:1rem;">
					<div>No projects found for filtered selected</div>
					<button style="padding:.5rem;margin-top:1rem;" onclick={filter.resetFilters}
						>Clear filters</button
					>
				</div>
			{/if}
				{#each filteredProjects as project}
					{@render projectLine(project)}
				{/each}
			<!-- {/if} -->
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0rem;
	}
	.content {
		width: 100%;
	}

	@media (min-width: 768px) {
		.container {
			display: flex;
			flex-direction: row;
			align-items: start;
		}
		.content {
			display: flex;
			width: auto;
			flex: 1 0 auto;
		}
		.header-search-wrapper {
			flex: 0 1 40%;
		}
	}
</style>
