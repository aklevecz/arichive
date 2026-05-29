<script>
	import '../app.css';
	let { children } = $props();
</script>

<header>
	<nav>
		<a href="/" class="brand">research tool</a>
		<div class="links">
			<a href="/reader">Reader</a>
			<a href="/kb">Knowledge base</a>
		</div>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	header {
		border-bottom: 1px solid var(--border);
	}
	nav {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem 1.25rem;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}
	.brand {
		font-weight: 700;
		color: var(--text);
		font-family: var(--font-mono);
	}
	.links a {
		margin-left: 1.25rem;
	}
	main {
		max-width: 900px;
		margin: 0 auto;
		padding: 1.5rem 1.25rem 4rem;
	}
</style>
