<script>
	import Seo from '$lib/components/seo.svelte';

	const { data } = $props();

	/** @param {string} date */
	function fmtDate(date) {
		if (!date) return '';
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<Seo title="Writing - Ariel Klevecz" description="Writing and research by Ariel Klevecz" />

<div class="writing-page">
	<header class="page-head">
		<h1 class="page-title">Writing</h1>
		<p class="page-dek">Notes, essays, and research from the lab.</p>
	</header>

	<section class="section">
		<h2 class="section-title">Essays</h2>
		{#if data.writing.length === 0}
			<p class="empty">Nothing published yet.</p>
		{:else}
			<ul class="entry-list">
				{#each data.writing as entry}
					<li class="entry">
						<a href={`/writing/${entry.slug}`} class="entry-link">
							<span class="entry-title">
								{entry.title}
								{#if entry.draft}<span class="draft-tag">Draft</span>{/if}
							</span>
							{#if entry.date}<time class="entry-date">{fmtDate(entry.date)}</time>{/if}
							{#if entry.description}<span class="entry-desc">{entry.description}</span>{/if}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>

	<section class="section">
		<h2 class="section-title">Research</h2>
		{#if data.research.length === 0}
			<p class="empty">Coming soon.</p>
		{:else}
			<ul class="entry-list">
				{#each data.research as entry}
					<li class="entry">
						<a href={`/writing/${entry.slug}`} class="entry-link">
							<span class="entry-title">
								{entry.title}
								{#if entry.draft}<span class="draft-tag">Draft</span>{/if}
							</span>
							{#if entry.date}<time class="entry-date">{fmtDate(entry.date)}</time>{/if}
							{#if entry.description}<span class="entry-desc">{entry.description}</span>{/if}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</div>

<style>
	.writing-page {
		max-width: 720px;
		margin: 0 auto;
		padding: var(--space-lg) var(--space-md);
	}

	.page-head {
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-md);
		border-bottom: 1px solid var(--border-color);
	}

	.page-title {
		font-family: var(--font-display);
		font-size: clamp(28px, 4vw, 40px);
		font-weight: 700;
		text-transform: none;
		letter-spacing: 0;
		line-height: 1.1;
	}

	.page-dek {
		margin: var(--space-xs) 0 0;
		font-size: var(--font-size-body);
		opacity: 0.6;
	}

	.section {
		margin-bottom: var(--space-lg);
	}

	.section-title {
		font-family: var(--font-body-alt);
		font-size: var(--font-size-small);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.55;
		margin-bottom: var(--space-sm);
	}

	.entry-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.entry {
		border-top: 1px solid var(--border-color);
	}

	.entry-link {
		display: block;
		padding: var(--space-sm) 0;
		color: var(--text-color);
	}

	.entry-link:hover {
		opacity: 0.65;
		color: var(--text-color);
	}

	.entry-title {
		display: block;
		font-size: clamp(18px, 2.5vw, 22px);
		font-weight: 600;
		line-height: 1.25;
	}

	.draft-tag {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border: 1px solid var(--border-color);
		padding: 1px 5px;
		margin-left: 6px;
		vertical-align: middle;
		opacity: 0.5;
	}

	.entry-date {
		display: block;
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.5;
		margin-top: 2px;
	}

	.entry-desc {
		display: block;
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		opacity: 0.75;
		margin-top: 4px;
	}

	.empty {
		opacity: 0.5;
		font-style: italic;
	}
</style>
