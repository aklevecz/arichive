<script>
	import '../app.css';
	import '../stack.css';
	import ModeToggle from '$lib/components/mode-toggle.svelte';

	const { children } = $props();
</script>

<div class="site-layout">
	{@render children()}
	<ModeToggle />
</div>

<style>
	.site-layout {
		position: relative;
		min-height: 100vh;
	}
</style>
