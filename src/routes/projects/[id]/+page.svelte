<script>
	import projectToImages from '$lib/projectToImages.json';
	/** @type {{data:import('./$types').PageData}} */
	let { data } = $props();
	const { project } = data;

	/** @type {Record<string, string[]>} */
	let imageMap = projectToImages;
	/** @type {string[]} */
	const images = imageMap[project.id] ?? [];
	const src = images[0] ? `/projects/${project.id}/${images[0]}` : '/projects/bao/bao.jpeg';
</script>

{#snippet headline(/** @type {{device:'mobile' | 'desktop'}} */ { device })}
	<div class="headline {device}">
		<h3>{project.name}</h3>
		<!-- <img {src} style="height:75px; margin: 1rem 0;" alt={project.name} /> -->
	</div>
{/snippet}
{@render headline({ device: 'mobile' })}
<div class="content">
	<div class="website-iframe-container">
		<iframe class="website-iframe" title={`${project.name} iframe`} src={project.url} style=""
		></iframe>
	</div>
	<div class="info-container">
		{@render headline({ device: 'desktop' })}
		<div style="margin:1rem 0 1.5rem; display:block;">
			<a class="btn visit-site" href={project.url} target="_blank" rel="noopener noreferrer"
				>visit site</a
			>
		</div>
		<div style="margin-bottom:1rem;">{project.description}</div>
		{#if project.descriptionLong}
			{#each project.descriptionLong as paragraph}
				<p>{paragraph}</p>
			{/each}
		{/if}
		<div>
			<div style="display:flex; flex-wrap:wrap; gap:1rem; margin-top:1rem;">
				{#each project.categories as category}
					<div class="category-nugget">{category}</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.headline {
		align-items: center;
		justify-content: space-between;
		margin: 1rem 0;
		font-size: 1.5rem;
	}
	.headline.mobile {
		display: flex;
	}
	.headline.desktop {
		display: none;
	}
	.content {
		display: flex;
		flex-direction: column;
	}

	.website-iframe {
		width: 100%;
		height: 300px;
		border: none;
	}
	.visit-site {
		width: 150px;
		text-align: center;
	}

	@media (min-width: 1200px) {
		.headline {
			/* margin-left: 1rem; */
			/* margin: 1rem 0; */
		}
		.headline.mobile {
			display: none;
		}
		.headline.desktop {
			display: flex;
		}
		.content {
			gap: 2rem;
			margin-top: 1rem;
			margin-left: 1rem;
		}

		h3 {
			font-size: 3rem;
		}
		.content {
			flex-direction: row;
		}
		.website-iframe-container {
			margin-top: 1rem;
			flex: 1;
			order: 2;
		}
		.website-iframe {
			height: 75vh;
		}
		.info-container {
			flex: 0 1 33%;
		}
	}
</style>
