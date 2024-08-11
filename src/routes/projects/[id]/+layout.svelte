<script>
	import projectToImages from '$lib/projectToImages.json';
	/** @type {{data:import('./$types').PageData, children:any}} */
	let { data, children } = $props();
	const { project } = data;
	/** @type {Record<string, string[]>} */
	let imageMap = projectToImages;
	/** @type {string[]} */
	const images = imageMap[project?.id || 0] ?? [];
	const host = 'https://klevecz.net';
	const imagePrefix = `projects/${project?.id}/`;
	const src = images[0] ? `projects/${project?.id}/${images[0]}` : 'projects/bao/bao.jpeg';
	const imgSrc = `${host}/${src}`;
</script>

<svelte:head>
	<title>{project?.name}</title>
	<meta name="description" content={project?.description} />
	<meta property="og:title" content={project?.name} />
	<meta property="og:description" content={project?.description} />
	<meta property="og:image" content={imgSrc} />
	<meta property="og:url" content={`${host}/${project?.id}`} />
	<meta name="twitter:title" content={project?.name} />
	<meta name="twitter:description" content={project?.description} />
	<meta name="twitter:image" content={imgSrc} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
{@render children()}
