<script>
	import '../app.css';
	import '../stack.css';

	const { children } = $props();
</script>

<div class="site-layout">
	{@render children()}
</div>

<style>
	.site-layout {
		position: relative;
		min-height: 100vh;
	}
</style>
