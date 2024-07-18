<script>
	import '../app.css';
	import "../stack.css";
	const { children } = $props();
</script>

<div style="padding: 1rem;">
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
</style>
