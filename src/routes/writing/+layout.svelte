<script>
	const { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="reader">
	{@render children()}
</div>

<style>
	/* Editorial serif scope: one serif, one weight, left aligned,
	   full ink, no rules. Sans only for small labels. */
	.reader {
		--serif: 'Newsreader', Georgia, 'Times New Roman', serif;
		--sans: var(--font-display, 'Helvetica Neue', Arial, sans-serif);
		--ink: var(--text-color);
	}
</style>
