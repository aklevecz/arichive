<script>
	import SearchBar from '$lib/components/search-bar.svelte';
    import ArielInfo from '$lib/components/ariel-info.svelte';
	import projects from '$lib/stores/projects.svelte';
</script>

<div style="display:flex; flex-direction:column; align-items:center; padding: 1rem;">
	<img style="width:90%;" src="headings/header.png" alt="header" />
    <ArielInfo />
	<div style="width:100%;">
		<div style="margin-top:.5rem;">
			<SearchBar />
		</div>
		<div style="margin-top:1rem; padding:.5rem;border: 3px solid var(--secondary-color); min-height: 300px;">
			{#snippet projectLine({ name, categories })}
				<div style="display:flex; justify-content:space-between;">
					<div style="flex: 1 0 50%;">{name}</div>
					<div style="display:flex; align-items:center; gap:.5rem;">
						{#each categories as category}
							<div style="font-size:.5rem;">{category}</div>
						{/each}
					</div>
				</div>
			{/snippet}
			{#each projects.state as project}
				{@render projectLine(project)}
			{/each}
		</div>
	</div>
</div>
