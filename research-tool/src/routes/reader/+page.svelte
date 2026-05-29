<script>
	const ALL_THINKERS = [
		'McLuhan',
		'Latour',
		'Marx',
		'Debord',
		'Foucault',
		'Deleuze',
		'Han',
		'other'
	];

	let text = $state('');
	let sourceTitle = $state('');
	let sourceUrl = $state('');

	/** @type {HTMLTextAreaElement | undefined} */
	let textarea;

	let highlight = $state('');
	let context = $state('');

	let loading = $state(false);
	let error = $state('');

	/** @type {null | {explanation: string, connection: string, thinkers: string[], concepts: string[], suggested_title: string}} */
	let result = $state(null);
	let conceptsInput = $state('');
	let saveState = $state(''); // '', 'saving', 'saved', 'error'

	function captureSelection() {
		if (!textarea) return;
		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		if (start === end) {
			error = 'Select a passage in the text first.';
			return;
		}
		error = '';
		highlight = text.slice(start, end).trim();
		// Pull a window of surrounding text for context.
		context = text.slice(Math.max(0, start - 400), Math.min(text.length, end + 400)).trim();
	}

	async function explain() {
		captureSelection();
		if (!highlight) return;
		loading = true;
		error = '';
		result = null;
		saveState = '';
		try {
			const res = await fetch('/api/explain', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ highlight, context, sourceTitle })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error ?? 'Explain failed');
			result = data;
			conceptsInput = (data.concepts ?? []).join(', ');
		} catch (e) {
			error = e instanceof Error ? e.message : 'Explain failed';
		} finally {
			loading = false;
		}
	}

	/** @param {string} name */
	function toggleThinker(name) {
		if (!result) return;
		result.thinkers = result.thinkers.includes(name)
			? result.thinkers.filter((t) => t !== name)
			: [...result.thinkers, name];
	}

	async function save() {
		if (!result) return;
		saveState = 'saving';
		try {
			const concepts = conceptsInput
				.split(',')
				.map((c) => c.trim().toLowerCase())
				.filter(Boolean);
			const res = await fetch('/api/kb', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					highlight,
					context,
					suggested_title: result.suggested_title,
					source_title: sourceTitle,
					source_url: sourceUrl,
					explanation: result.explanation,
					connection: result.connection,
					thinkers: result.thinkers,
					concepts
				})
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error ?? 'Save failed');
			saveState = 'saved';
		} catch (e) {
			error = e instanceof Error ? e.message : 'Save failed';
			saveState = 'error';
		}
	}
</script>

<svelte:head>
	<title>Reader — Research Tool</title>
</svelte:head>

<h1>Reader</h1>

<div class="source-meta">
	<input placeholder="Source title (e.g. Society of the Spectacle)" bind:value={sourceTitle} />
	<input placeholder="Source URL (optional)" bind:value={sourceUrl} />
</div>

<textarea
	bind:this={textarea}
	bind:value={text}
	rows="14"
	placeholder="Paste the text you're reading here, then select a passage and click Explain."
></textarea>

<div class="actions">
	<button onclick={explain} disabled={loading || !text.trim()}>
		{loading ? 'Explaining…' : 'Explain selection'}
	</button>
	{#if highlight}<span class="muted">Selected {highlight.length} chars</span>{/if}
</div>

{#if error}<p class="error">{error}</p>{/if}

{#if result}
	<div class="panel result">
		<input class="title-input" bind:value={result.suggested_title} />

		<h3>Highlighted</h3>
		<blockquote>{highlight}</blockquote>

		<h3>Explanation</h3>
		<textarea bind:value={result.explanation} rows="6"></textarea>

		<h3>Connection to the thesis</h3>
		<textarea bind:value={result.connection} rows="4"></textarea>

		<h3>Thinkers</h3>
		<div class="thinker-toggles">
			{#each ALL_THINKERS as name}
				<button
					class="secondary {result.thinkers.includes(name) ? 'on' : ''}"
					onclick={() => toggleThinker(name)}
				>
					{name}
				</button>
			{/each}
		</div>

		<h3>Concepts</h3>
		<input bind:value={conceptsInput} placeholder="comma, separated, tags" />

		<div class="actions">
			<button onclick={save} disabled={saveState === 'saving'}>
				{saveState === 'saved' ? '✓ Saved' : saveState === 'saving' ? 'Saving…' : 'Save to knowledge base'}
			</button>
			{#if saveState === 'saved'}<a href="/kb" class="muted">View knowledge base →</a>{/if}
		</div>
	</div>
{/if}

<style>
	.source-meta {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 1rem 0;
	}
	.error {
		color: #e07a5f;
	}
	.result h3 {
		margin: 1.2rem 0 0.4rem;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--muted);
	}
	.title-input {
		font-size: 1.2rem;
		font-weight: 700;
		border: none;
		border-bottom: 1px solid var(--border);
		border-radius: 0;
		padding: 0.2rem 0;
	}
	blockquote {
		margin: 0;
		padding: 0.5rem 0.9rem;
		border-left: 3px solid var(--accent);
		color: var(--muted);
		font-style: italic;
	}
	.thinker-toggles {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.thinker-toggles .on {
		background: var(--accent);
		color: #1a1206;
		border-color: var(--accent);
	}
	@media (max-width: 640px) {
		.source-meta {
			grid-template-columns: 1fr;
		}
	}
</style>
