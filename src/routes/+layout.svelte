<script>
	import '../app.css';
	import '../stack.css';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';

	const { children } = $props();
</script>

<div class="bauhaus-layout">
	<!-- Geometric decorations -->
	<div class="geometric-decorations">
		<div class="bauhaus-shape bauhaus-circle shape-yellow" style="width: 120px; height: 120px; top: 10%; right: 5%;"></div>
		<div class="bauhaus-shape bauhaus-square shape-red" style="width: 60px; height: 60px; top: 60%; left: 5%;"></div>
		<div class="bauhaus-shape bauhaus-circle shape-blue" style="width: 80px; height: 80px; bottom: 15%; right: 10%;"></div>
	</div>

	{@render children()}

	<ThemeSwitcher />
</div>

<style>
	.bauhaus-layout {
		position: relative;
		min-height: 100vh;
		padding: var(--space-lg);
		padding-top: var(--space-md);
	}

	.geometric-decorations {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.6;
	}

	/* Purist theme - no decorations */
	:global(body[data-theme="purist"]) .geometric-decorations {
		display: none;
	}

	/* Modern theme - subtle decorations */
	:global(body[data-theme="modern"]) .geometric-decorations {
		opacity: 0.3;
	}

	/* Brutalist theme - bold decorations */
	:global(body[data-theme="brutalist"]) .geometric-decorations {
		opacity: 0.15;
	}

	:global(.category-nugget) {
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		background-color: var(--text-color);
		color: var(--bg-color);
		border: var(--border-width) solid var(--border-color);
		padding: var(--space-xs) var(--space-sm);
		letter-spacing: 0.05em;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	:global(.category-nugget:hover) {
		background-color: var(--accent-color);
		color: var(--pure-black);
		transform: translate(-2px, -2px);
		box-shadow: 3px 3px 0 var(--border-color);
	}

	/* NYT/Purist category tags - minimal text labels */
	:global(body[data-theme="purist"]) .category-nugget {
		font-family: var(--font-body-alt);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.05em;
		background: transparent;
		border: none;
		padding: 0;
		margin-right: var(--space-sm);
		text-transform: capitalize;
		color: #666;
	}

	:global(body[data-theme="purist"]) .category-nugget:hover {
		background: transparent;
		color: var(--text-color);
		border: none;
		transform: none;
		box-shadow: none;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (max-width: 768px) {
		.bauhaus-layout {
			padding: var(--space-sm);
		}

		:global(body[data-theme="purist"]) .bauhaus-layout {
			padding: var(--space-sm);
		}

		.geometric-decorations {
			display: none;
		}
	}
</style>
