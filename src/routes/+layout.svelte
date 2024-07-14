<script>
	import '../app.css';
	const { children } = $props();
</script>

{@render children()}

<style>
	:global(html, body) {
		color: var(--secondary-color);
		background-color: var(--primary-color);
		font-family: monospace;
		font-size: 18px;
		margin: 0;
		padding: 0;
	}
</style>
