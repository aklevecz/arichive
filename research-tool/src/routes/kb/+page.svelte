<script>
	const ALL_THINKERS = ['McLuhan', 'Latour', 'Marx', 'Debord', 'Foucault', 'Deleuze', 'Han'];

	let { data } = $props();

	let query = $state('');
	let searching = $state(false);
	/** @type {null | any[]} */
	let searchResults = $state(null);
	let searchError = $state('');

	async function runSearch() {
		const q = query.trim();
		if (!q) {
			searchResults = null;
			return;
		}
		searching = true;
		searchError = '';
		try {
			const res = await fetch(`/api/kb/search?q=${encodeURIComponent(q)}`);
			const d = await res.json();
			if (!res.ok) throw new Error(d.error ?? 'Search failed');
			searchResults = d.entries;
		} catch (e) {
			searchError = e instanceof Error ? e.message : 'Search failed';
		} finally {
			searching = false;
		}
	}

	function clearSearch() {
		query = '';
		searchResults = null;
		searchError = '';
	}

	const shown = $derived(searchResults ?? data.entries);

	/** @param {string} iso */
	function fmt(iso) {
		try {
			return new Date(iso).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			});
		} catch {
			return iso;
		}
	}
</script>

<svelte:head>
	<title>Knowledge base — Research Tool</title>
</svelte:head>

<h1>Knowledge base</h1>

<form
	class="search"
	onsubmit={(e) => {
		e.preventDefault();
		runSearch();
	}}
>
	<input bind:value={query} placeholder="Semantic search (e.g. 'control as modulation')" />
	<button type="submit" disabled={searching}>{searching ? 'Searching…' : 'Search'}</button>
	{#if searchResults !== null}
		<button type="button" class="secondary" onclick={clearSearch}>Clear</button>
	{/if}
</form>

<div class="filters">
	<a class="tag" href="/kb" class:active={!data.thinker}>All</a>
	{#each ALL_THINKERS as t}
		<a class="tag" href={`/kb?thinker=${t}`} class:active={data.thinker === t}>{t}</a>
	{/each}
</div>

{#if data.unavailable}
	<p class="muted">
		Bindings not available in this dev mode. Run <code>wrangler dev</code> (or deploy) so D1,
		Vectorize, and Workers AI are connected.
	</p>
{/if}
{#if data.error}<p class="error">{data.error}</p>{/if}
{#if searchError}<p class="error">{searchError}</p>{/if}

{#if searchResults !== null}
	<p class="muted">{searchResults.length} semantic match{searchResults.length === 1 ? '' : 'es'} for “{query}”</p>
{/if}

{#if shown.length === 0}
	<p class="muted">No entries yet. Head to the <a href="/reader">Reader</a> to add some.</p>
{:else}
	<ul class="entries">
		{#each shown as entry}
			<li class="panel entry">
				<div class="entry-head">
					<h3>{entry.suggested_title || entry.source_title || 'Untitled'}</h3>
					<span class="muted date">{fmt(entry.created_at)}</span>
				</div>
				{#if entry.source_title}
					<p class="muted src">
						{#if entry.source_url}<a href={entry.source_url} target="_blank" rel="noreferrer"
								>{entry.source_title}</a
							>{:else}{entry.source_title}{/if}
					</p>
				{/if}
				<blockquote>{entry.highlight}</blockquote>
				<p>{entry.explanation}</p>
				{#if entry.connection}<p class="connection">{entry.connection}</p>{/if}
				<div class="tags">
					{#each entry.thinkers as t}<span class="tag">{t}</span>{/each}
					{#each entry.concepts as c}<span class="tag concept">{c}</span>{/each}
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.search {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
	.filters {
		margin-bottom: 1.5rem;
	}
	.filters .tag {
		cursor: pointer;
	}
	.filters .tag.active {
		background: var(--accent);
		color: #1a1206;
	}
	.error {
		color: #e07a5f;
	}
	.entries {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 1rem;
	}
	.entry-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}
	.entry-head h3 {
		margin: 0;
	}
	.date {
		font-size: 0.8rem;
		white-space: nowrap;
	}
	.src {
		margin: 0.2rem 0 0.6rem;
		font-size: 0.85rem;
	}
	blockquote {
		margin: 0 0 0.6rem;
		padding: 0.4rem 0.9rem;
		border-left: 3px solid var(--accent);
		color: var(--muted);
		font-style: italic;
	}
	.connection {
		border-top: 1px dashed var(--border);
		padding-top: 0.6rem;
		color: var(--muted);
	}
	.tags {
		margin-top: 0.6rem;
	}
	.tag.concept {
		background: transparent;
		color: var(--muted);
	}
</style>
