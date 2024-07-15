<script>
	import '../app.css';
	const { children } = $props();
</script>

<img style="width:90%; display:block; margin:1rem auto;" src="/headings/header.png" alt="header" />
<div style="padding: 1rem;">
	{@render children()}
</div>

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
