<script>
	let contactInfo = $state(null);
	let loading = $state(false);

	async function fetchContact() {
		if (contactInfo) return;
		loading = true;
		try {
			const res = await fetch('/contact?sliack=meepo');
			contactInfo = await res.json();
		} catch (e) {
			contactInfo = null;
		}
		loading = false;
	}

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

	{#if contactInfo}
		<div class="contact-info">
			<a href="mailto:{contactInfo.email}">{contactInfo.email}</a>
			<a href="tel:{contactInfo.phone}">{contactInfo.phone}</a>
		</div>
	{:else}
		<button class="inquire-link" onclick={fetchContact} disabled={loading}>
			{loading ? '...' : 'contact'}
		</button>
	{/if}
</div>

<style>
	.ai-page {
		min-height: calc(100vh - 96px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 2rem;
	}

	.message {
		font-size: clamp(24px, 5vw, 48px);
		font-weight: 400;
		margin: 0;
		line-height: 1.3;
	}

	.inquire-link {
		margin-top: 2rem;
		font-size: 14px;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		border: none;
		background: none;
		border-bottom: 1px solid currentColor;
		padding: 0 0 2px 0;
		cursor: pointer;
		color: inherit;
	}

	.inquire-link:hover {
		opacity: 0.6;
		transform: none;
		box-shadow: none;
		background: none;
	}

	.contact-info {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		font-size: 16px;
	}

	.contact-info a {
		border-bottom: 1px solid currentColor;
		padding-bottom: 2px;
	}
</style>
