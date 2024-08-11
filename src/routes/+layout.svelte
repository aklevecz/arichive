<script>
	import '../app.css';
	import '../stack.css';
	const { children } = $props();

	const seo = {
		title: 'Ariel Klevecz',
		description: 'Ariel Klevecz - Mad Scientist',
		keywords: 'web development, ai, stable diffusion, finetuning, lora, nfts, web3',
		author: 'Ariel Klevecz',
		ogTitle: 'Ariel Klevecz',
		ogDescription: 'Ariel Klevecz - Mad Scientist',
		ogImage: 'URL to an image for social media preview',
		ogUrl: 'https://klevecz.net/headings/header.png',
		twitterCard: 'summary_large_image',
		twitterTitle: 'Ariel Klevecz',
		twitterDescription: 'Ariel Klevecz - Mad Scientist',
		twitterImage: 'https://klevecz.net/headings/header.png'
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
<div style="padding:1rem;padding-top:0;">
	{@render children()}
</div>

<style>
	/* :global(html, body) {
		color: var(--secondary-color);
		background-color: var(--primary-color);
		font-family: monospace;
		font-size: 18px;
		margin: 0;
		padding: 0;
	} */
	:global(.category-nugget) {
		font-size: 0.75rem;
		background-color: var(--secondary-color);
		color: var(--primary-color);
		padding: 1px 4px;
	}
</style>
