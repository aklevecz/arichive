<script>
	import Seo from '$lib/components/seo.svelte';

	const { data } = $props();

	// One chronological list; the section badge does the categorizing
	const entries = $derived(
		[...data.writing, ...data.research].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	);

	/** @param {string} date */
	function fmtDate(date) {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<Seo title="Writing - Ariel Klevecz" description="Writing and research by Ariel Klevecz" />

<div class="writing-page">
	<header class="page-head">
		<a href="/" class="back-link">&larr; home</a>
		<h1 class="page-title">Writing</h1>
		<p class="page-dek">Notes, essays, and research from the lab</p>
	</header>

	{#if entries.length === 0}
		<p class="empty">Nothing published yet.</p>
	{:else}
		<ol class="entry-list">
			{#each entries as entry, i}
				<li class="entry">
					<a href={`/writing/${entry.slug}`} class="entry-link">
						<span class="entry-index">{String(i + 1).padStart(2, '0')}</span>
						<span class="entry-body">
							<span class="entry-meta">
								<span class="entry-kind">{entry.section}</span>
								{#if entry.date}<time class="entry-date">{fmtDate(entry.date)}</time>{/if}
								{#if entry.draft}<span class="draft-tag">Draft</span>{/if}
							</span>
							<span class="entry-title">{entry.title}</span>
							{#if entry.description}<span class="entry-desc">{entry.description}</span>{/if}
						</span>
						<span class="entry-arrow" aria-hidden="true">&rarr;</span>
					</a>
				</li>
			{/each}
		</ol>
	{/if}
</div>

<style>
	.writing-page {
		max-width: 860px;
		margin: 0 auto;
		padding: var(--space-lg) var(--space-md) var(--space-xl);
	}

	.back-link {
		display: inline-block;
		font-size: var(--font-size-small);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.55;
		margin-bottom: var(--space-md);
	}

	.page-head {
		margin-bottom: var(--space-lg);
	}

	.page-title {
		font-size: var(--font-size-h1);
		line-height: var(--line-height-tight);
	}

	.page-dek {
		margin: var(--space-sm) 0 0;
		font-size: var(--font-size-body);
		opacity: 0.6;
	}

	.entry-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: var(--border-width) solid var(--border-color);
	}

	.entry {
		border-bottom: var(--border-width) solid var(--border-color);
	}

	.entry-link {
		display: flex;
		align-items: baseline;
		gap: var(--space-md);
		padding: var(--space-md) 0;
		color: var(--text-color);
	}

	.entry-link:hover {
		color: var(--text-color);
	}

	.entry-index {
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(28px, 4vw, 44px);
		line-height: 1;
		opacity: 0.15;
		flex: 0 0 auto;
		transition: opacity 0.2s ease;
	}

	.entry-link:hover .entry-index {
		opacity: 1;
		color: var(--accent-color);
	}

	.entry-body {
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 0;
	}

	.entry-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.entry-kind {
		font-weight: 700;
		border: 1px solid var(--border-color);
		padding: 2px 7px;
	}

	.entry-date {
		opacity: 0.5;
	}

	.draft-tag {
		font-weight: 700;
		color: var(--accent-color);
		border: 1px solid var(--accent-color);
		padding: 2px 7px;
	}

	.entry-title {
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: clamp(22px, 3.5vw, 34px);
		line-height: 1.05;
		transition: color 0.2s ease;
	}

	.entry-link:hover .entry-title {
		color: var(--accent-color);
	}

	.entry-desc {
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		opacity: 0.7;
		max-width: 60ch;
	}

	.entry-arrow {
		margin-left: auto;
		font-family: var(--font-display);
		font-weight: 800;
		font-size: clamp(20px, 3vw, 30px);
		opacity: 0;
		transform: translateX(-8px);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
		flex: 0 0 auto;
	}

	.entry-link:hover .entry-arrow {
		opacity: 1;
		transform: translateX(0);
		color: var(--accent-color);
	}

	.empty {
		opacity: 0.5;
		font-style: italic;
	}

	@media (max-width: 600px) {
		.entry-link {
			gap: var(--space-sm);
		}
		.entry-arrow {
			display: none;
		}
	}
</style>
