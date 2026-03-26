<script>
	import search from '$lib/stores/search.svelte';

	/** @param {*} e */
	function onInput(e) {
		search.updateQuery(e.target.value);
	}
</script>

<div class="search-container">
	<label for="search-input" class="search-label">Search:</label>
	<div class="search-bar">
		<input
			id="search-input"
			oninput={onInput}
			type="text"
			placeholder="Type to search projects..."
			class="search-input"
		/>
	</div>
</div>

<style>
	.search-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.search-label {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: var(--line-height-tight);
	}

	.search-bar {
		position: relative;
		width: 100%;
	}

	.search-input {
		width: 100%;
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		font-weight: 400;
		border: none;
		border-bottom: var(--border-width) solid var(--border-color);
		background-color: transparent;
		color: var(--text-color);
		outline: none;
		padding: var(--space-sm) 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: border-color 0.2s ease;
	}

	.search-input:focus {
		border-bottom-color: var(--accent-color);
	}

	.search-input::placeholder {
		color: var(--text-color);
		opacity: 0.3;
		font-weight: 700;
		font-size: 0.875rem;
	}

	/* NYT/Purist mode - refined serif input */
	:global(body[data-theme="purist"]) .search-label {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		font-weight: 700;
		letter-spacing: 0;
		text-transform: none;
	}

	:global(body[data-theme="purist"]) .search-input {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		text-transform: none;
		letter-spacing: 0;
		border-bottom-color: var(--border-color);
		padding: var(--space-xs) 0;
	}

	:global(body[data-theme="purist"]) .search-input:focus {
		border-bottom-color: var(--text-color);
	}

	:global(body[data-theme="purist"]) .search-input::placeholder {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		opacity: 0.4;
		text-transform: none;
		letter-spacing: 0;
		font-weight: 400;
	}

	/* Brutalist mode - thicker border */
	:global(body[data-theme="brutalist"]) .search-input {
		border-bottom-width: calc(var(--border-width) * 1.5);
	}

	@media (max-width: 768px) {
		.search-label {
			font-size: var(--font-size-small);
		}

		.search-container {
			gap: 4px;
		}

		:global(body[data-theme="purist"]) .search-label {
			font-size: var(--font-size-small);
		}

		:global(body[data-theme="purist"]) .search-input {
			padding: 4px 0;
			font-size: var(--font-size-small);
		}

		:global(body[data-theme="purist"]) .search-input::placeholder {
			font-size: var(--font-size-small);
		}
	}
</style>
