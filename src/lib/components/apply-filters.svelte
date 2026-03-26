<script>
	import filter from '$lib/stores/filter.svelte';
	import projects from '$lib/stores/projects.svelte';

	let showFilters = $state(false);
</script>

<div class="filters-container">
	<div class="filters-header">
		<h2 class="filters-title">Filter by category:</h2>
		<button class="toggle-btn" onclick={() => (showFilters = !showFilters)}>
			{showFilters ? 'hide categories' : 'show all categories'}
		</button>
	</div>

	{#if !showFilters && filter.state.categories.length > 0}
		<div class="active-filters">
			<div class="active-label">Active filters:</div>
			<div class="category-grid">
				{#each projects.categories.filter((category) => filter.state.categories.includes(category)) as category}
					<button onclick={() => filter.toggleCategory(category)} class="category-nugget active">
						{category}
					</button>
				{/each}
			</div>
		</div>
	{/if}

	{#if showFilters}
		<div class="category-grid">
			{#each projects.categories as category}
				<button
					onclick={() => filter.toggleCategory(category)}
					class="category-nugget"
					class:active={filter.state.categories.includes(category)}
				>
					{category}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.filters-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.filters-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
	}

	.filters-title {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		font-weight: 700;
		text-transform: none;
		letter-spacing: 0;
		line-height: var(--line-height-body);
		margin: 0;
	}

	:global(body[data-theme="purist"]) .filters-title {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		font-weight: 700;
	}

	.toggle-btn {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		font-weight: 300;
		padding: 0;
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.toggle-btn:hover {
		background: var(--text-color);
		color: var(--bg-color);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--border-color);
	}

	/* NYT/Purist - text link toggle */
	:global(body[data-theme="purist"]) .toggle-btn {
		width: auto;
		height: auto;
		border: none;
		background: transparent;
		font-size: var(--font-size-small);
		font-weight: 400;
		text-decoration: underline;
		text-underline-offset: 2px;
		color: var(--text-color);
	}

	@media (hover: hover) {
		:global(body[data-theme="purist"]) .toggle-btn:hover {
			background: transparent;
			transform: none;
			box-shadow: none;
			text-decoration-thickness: 1.5px;
			color: var(--text-color);
		}
	}

	.active-filters {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.active-label {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		font-weight: 700;
		text-transform: none;
		letter-spacing: 0;
		opacity: 1;
	}

	:global(body[data-theme="purist"]) .active-label {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		font-weight: 700;
	}

	.category-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.category-nugget {
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		background-color: transparent;
		color: var(--text-color);
		border: var(--border-width) solid var(--border-color);
		padding: var(--space-xs) var(--space-sm);
		letter-spacing: 0.05em;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.category-nugget:hover {
		background: var(--text-color);
		color: var(--bg-color);
		transform: translate(-2px, -2px);
		box-shadow: 3px 3px 0 var(--border-color);
	}

	.category-nugget.active {
		background-color: var(--accent-color);
		color: var(--pure-black);
		border-color: var(--accent-color);
	}

	.category-nugget.active:hover {
		background-color: var(--text-color);
		color: var(--bg-color);
		border-color: var(--border-color);
	}

	@media (max-width: 768px) {
		.filters-title {
			font-size: var(--font-size-small);
		}

		.filters-container {
			gap: 4px;
		}

		.filters-header {
			gap: var(--space-xs);
		}

		:global(body[data-theme="purist"]) .filters-title {
			font-size: var(--font-size-small);
		}

		:global(body[data-theme="purist"]) .toggle-btn {
			font-size: var(--font-size-caption);
		}
	}
</style>
