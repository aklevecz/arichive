<script>
	import projectToImages from '$lib/projectToImages.json';
	/** @type {{data:import('./$types').PageData}} */
	let { data } = $props();
	const { project } = data;

	/** @type {Record<string, string[]>} */
	let imageMap = projectToImages;

	/** @type {string[]} */
	const images = imageMap[project.name];
</script>

<h1>{project.name}</h1>
<img
	src={`/projects/${project.name}/${images[0]}`}
	style="width:300px; height: 300px; background-color: red;"
	alt={project.name}
/>
<div>{project.description}</div>
<div>
	<a href={project.url} target="_blank" rel="noopener noreferrer">{project.url}</a>
</div>
<div>
	<div style="display:flex; flex-wrap:wrap; gap:1rem; margin-top:1rem;">
		{#each project.categories as category}
			<div class="category-nugget">{category}</div>
		{/each}
	</div>
</div>
