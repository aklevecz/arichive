<script>
	import '../app.css';
	import '../stack.css';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';

	const { children } = $props();
</script>

<div class="site-layout">
	{@render children()}
	<ThemeSwitcher />
</div>

<style>
	.site-layout {
		position: relative;
		min-height: 100vh;
	}
</style>
