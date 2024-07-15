<script>
	import SearchBar from '$lib/components/search-bar.svelte';
	import ArielInfo from '$lib/components/ariel-info.svelte';
	import projects from '$lib/stores/projects.svelte';
	import search from '$lib/stores/search.svelte';

</script>

<div style="display:flex; flex-direction:column; align-items:center; padding: 0rem;">
	<ArielInfo />
	<div style="width:100%;">
		<div style="">
			<SearchBar />
		</div>
		<div
			style="margin-top:1rem; padding:.5rem;border: 3px solid var(--secondary-color);"
		>
			{#snippet projectLine({ name, categories })}
				<a href={`/projects/${name}`} style="display:block; justify-content:space-between; margin-bottom:.5rem;">
					<div style="flex: 1 0 50%;">{name}</div>
					<div style="display:flex; align-items:center; gap:.5rem;">
						{#each categories as category}
							<div style="font-size:.75rem;">{category}</div>
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
