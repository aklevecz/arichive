<script>
	let {
		enabled = $bindable(true),
		mode = $bindable('particles')
	} = $props();

	const effects = [
		{ id: 'particles', name: 'Particles' },
		{ id: 'gradient', name: 'Gradient' },
		{ id: 'displacement', name: 'Displacement' },
		{ id: 'noise', name: 'Noise' }
	];
</script>

<div class="webgl-controls">
	<button onclick={() => (enabled = !enabled)} class="toggle-btn">
		{enabled ? 'Disable' : 'Enable'} Background
	</button>

	{#if enabled}
		<div class="effect-selector">
			{#each effects as effectOption}
				<button
					onclick={() => (mode = effectOption.id)}
					class="effect-btn"
					class:active={mode === effectOption.id}
				>
					{effectOption.name}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.webgl-controls {
		position: fixed;
		bottom: var(--space-md);
		right: var(--space-md);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.toggle-btn {
		font-family: var(--font-body);
		font-size: var(--font-size-small);
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.toggle-btn:hover {
		background: var(--text-color);
		color: var(--bg-color);
	}

	.effect-selector {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.effect-btn {
		font-family: var(--font-body);
		font-size: var(--font-size-small);
		padding: 4px var(--space-xs);
		border: 1px solid var(--border-color);
		background: transparent;
		color: var(--text-color);
		cursor: pointer;
		text-align: left;
		transition: all 0.2s ease;
	}

	.effect-btn:hover {
		background: var(--text-color);
		color: var(--bg-color);
	}

	.effect-btn.active {
		background: var(--accent-color);
		border-color: var(--accent-color);
		color: var(--pure-black);
	}

	@media (max-width: 768px) {
		.webgl-controls {
			display: none;
		}
	}
</style>
