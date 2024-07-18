<script>
	import Header from '$lib/components/header.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import projects from '$lib/stores/projects.svelte';
	import search from '$lib/stores/search.svelte';
</script>

<div class="container">
	<div class="stack header-search-wrapper">
		<Header />
		<SearchBar />
	</div>
	<div class="content">
		<div style="margin-top:1rem; padding:.5rem;border: 3px solid var(--secondary-color); width: 100%;">
			{#snippet projectLine({ name, categories })}
				<a
					href={`/projects/${name}`}
					style="display:block; justify-content:space-between; margin-bottom:.5rem;"
				>
					<div style="flex: 1 0 50%;">{name}</div>
					<div style="display:flex; align-items:center; gap:.5rem;margin-top:.2rem;">
						{#each categories as category}
							<div style="font-size:.75rem;background-color:var(--secondary-color); color:var(--primary-color);padding:1px 4px;">{category}</div>
						{/each}
					</div>
				</a>
			{/snippet}
			{#if search.hasSearchResults}
				{#each search.state.results as project}
					{@render projectLine(project.item)}
				{/each}
			{:else}
				{#each projects.state as project}
					{@render projectLine(project)}
				{/each}
			{/if}
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
            flex: 0 1 40%
        }
	}
</style>
