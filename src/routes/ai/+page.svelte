<script>
	const seo = {
		title: 'AI - Ariel Klevecz',
		description: 'AI solutions by Ariel Klevecz'
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
</svelte:head>

<div class="ai-page">
	<p class="message">hi i can help you with ai solutions</p>
	<p class="message">inquire within</p>
	<a href="/contact" class="inquire-link">contact</a>
</div>

<style>
	.ai-page {
		min-height: calc(100vh - 96px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}

	.message {
		font-size: clamp(24px, 5vw, 48px);
		font-weight: 700;
		text-align: center;
		margin: 0;
		line-height: 1.3;
	}

	.inquire-link {
		margin-top: 2rem;
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		border-bottom: 1px solid currentColor;
		padding-bottom: 2px;
	}
</style>
