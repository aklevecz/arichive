<script>
	import '../app.css';
	import '../stack.css';
	const { children } = $props();

	
</script>


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
		font-family: monospace;
		font-size: .75rem;
		background-color: var(--secondary-color);
		color: var(--primary-color);
		margin-top: 8px;
		padding: 2px 8px;
	}
</style>
