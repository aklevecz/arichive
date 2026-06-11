<script>
	import { page } from '$app/stores';

	let {
		title = 'Ariel Klevecz',
		description = 'Ariel Klevecz — interactive art, AR experiences, and software in Los Angeles',
		image = 'https://eggs.yaytso.art/tokens/egg-token.png',
		type = 'website'
	} = $props();

	const SITE = 'https://klevecz.net';
	const url = $derived(`${SITE}${$page.url.pathname}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Ariel Klevecz" />
	<link rel="canonical" href={url} />
	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
