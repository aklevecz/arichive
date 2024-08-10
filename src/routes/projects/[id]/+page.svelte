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

<div style="display:flex; align-items:center; justify-content:space-between;">
	<h3>{project.name}</h3>
	<img {src} style="height:75px; margin: 1rem 0;" alt={project.name} />
</div>
<iframe
	title={`${project.name} iframe`}
	src={project.url}
	style="width:100%; height: 300px; border: none;"
></iframe>
<div style="margin:1rem 0;">
	<a class="btn" href={project.url} target="_blank" rel="noopener noreferrer">visit site</a>
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
