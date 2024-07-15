<script>
	/** @type {{data:import('./$types').PageData}} */
	let { data } = $props();
	const { project } = data;
</script>

<h1>{project.name}</h1>
<div style="width:300px; height: 300px; background-color: red;"></div>
<div>{project.description}</div>
<div>
	{#each project.categories as category}
	<div>{category}</div>
	{/each}
</div>
