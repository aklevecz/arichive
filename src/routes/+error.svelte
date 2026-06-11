<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - Ariel Klevecz</title>
</svelte:head>

<div class="error-page">
	<h1>{$page.status}</h1>
	<p>{$page.status === 404 ? "This page doesn't exist." : $page.error?.message || 'Something went wrong.'}</p>
	<a href="/">Back home</a>
</div>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		text-align: center;
		padding: 2rem;
	}

	.error-page h1 {
		font-size: var(--font-size-hero);
	}

	.error-page a {
		border-bottom: 1px solid currentColor;
		padding-bottom: 2px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 14px;
	}
</style>
