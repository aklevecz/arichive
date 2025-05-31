<script>
	import ApplyFilters from '$lib/components/apply-filters.svelte';
	import Header from '$lib/components/header.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import filter from '$lib/stores/filter.svelte';
	import projects from '$lib/stores/projects.svelte';

	let filteredProjects = $derived(
		projects.state.filter(projects.searchFilter).filter(projects.categoryFilter)
	);
	const meImg = 'https://eggs.yaytso.art/tokens/egg-token.png';

	const seo = {
		title: 'Ariel Klevecz',
		description: 'Ariel Klevecz - Mad Scientist',
		keywords: 'web development, ai, stable diffusion, finetuning, lora, nfts, web3',
		author: 'Ariel Klevecz',
		ogTitle: 'Ariel Klevecz',
		ogDescription: 'Ariel Klevecz - Mad Scientist',
		ogImage: meImg,
		ogUrl: 'https://klevecz.net',
		twitterCard: 'summary_large_image',
		twitterTitle: 'Ariel Klevecz',
		twitterDescription: 'Ariel Klevecz - Mad Scientist',
		twitterImage: meImg
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />
	<meta name="author" content={seo.author} />
	<meta property="og:title" content={seo.ogTitle} />
	<meta property="og:description" content={seo.ogDescription} />
	<meta property="og:image" content={seo.ogImage} />
	<meta property="og:url" content={seo.ogUrl} />
	<meta name="twitter:card" content={seo.twitterCard} />
	<meta name="twitter:title" content={seo.twitterTitle} />
	<meta name="twitter:description" content={seo.twitterDescription} />
	<meta name="twitter:image" content={seo.twitterImage} />
</svelte:head>
<div class="container">
	<div class="stack header-search-wrapper">
		<Header />
		<SearchBar />
		<ApplyFilters />
	</div>
	<div class="content">
		<div
			style="margin-top:1rem; padding:1rem; border: 3px solid var(--secondary-color); width: 100%;"
		>
			{#if filteredProjects.length === 0}
				<div style="padding:1rem;">
					<div>No projects found for filtered selected</div>
					<button style="padding:.5rem;margin-top:1rem;" onclick={filter.resetFilters}
						>Clear filters</button
					>
				</div>
			{/if}
			{#snippet projectLine(/** @type {Project} */ project)}
				<a
					href={`/projects/${project.id}`}
					style="display:block; justify-content:space-between; margin-bottom:1.25rem;"
				>
					<div style="flex: 1 0 50%;">{project.name}</div>
					<div style="display:flex;flex-wrap:wrap; align-items:center; gap:.5rem;margin-top:.2rem;">
						{#each project.categories as category}
							<div class="category-nugget" style="">
								{category}
							</div>
						{/each}
					</div>
				</a>
			{/snippet}
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
