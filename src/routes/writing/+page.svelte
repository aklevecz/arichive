<script>
	const seo = {
		title: 'Writing - Ariel Klevecz',
		description: 'Writing by Ariel Klevecz'
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
</svelte:head>

<div class="writing-page">
	<p class="message">coming soon...</p>
</div>

<style>
	.writing-page {
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
</style>
