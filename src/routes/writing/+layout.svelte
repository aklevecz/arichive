<script>
	const { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,500;1,6..72,600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="reader">
	{@render children()}
</div>

<style>
	/* NYT-inspired editorial type scope. Serif body + headlines,
	   sans-serif kickers/labels (the signature contrast). */
	.reader {
		--serif: 'Newsreader', Georgia, 'Times New Roman', serif;
		--sans: var(--font-display, 'Helvetica Neue', Arial, sans-serif);
		--ink: var(--text-color);
		--rule: var(--text-color);
	}
</style>
