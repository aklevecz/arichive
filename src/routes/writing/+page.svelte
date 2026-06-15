<script>
	import Seo from '$lib/components/seo.svelte';

	const { data } = $props();

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
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<Seo title="Writing - Ariel Klevecz" description="Writing and research by Ariel Klevecz" />

<div class="writing-page">
	<header class="masthead">
		<a href="/" class="back-link">&larr; Home</a>
		<h1 class="masthead-title">Writing</h1>
		<p class="masthead-dek">Notes, essays, and research from the lab</p>
	</header>

	{#if entries.length === 0}
		<p class="empty">Nothing published yet.</p>
	{:else}
		<ul class="entry-list">
			{#each entries as entry}
				<li class="entry">
					<a href={`/writing/${entry.slug}`} class="entry-link">
						<span class="kicker">
							{entry.section}{#if entry.date}<span class="dot">·</span>{fmtDate(entry.date)}{/if}{#if entry.draft}<span class="dot">·</span>Draft{/if}
						</span>
						<h2 class="entry-title">{entry.title}</h2>
						{#if entry.description}<p class="entry-desc">{entry.description}</p>{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.writing-page {
		max-width: 680px;
		margin: 0 auto;
		padding: var(--space-lg) var(--space-md) var(--space-xl);
		color: var(--ink);
	}

	.back-link {
		display: inline-block;
		font-family: var(--sans);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: var(--space-lg);
		color: var(--ink);
	}

	.masthead {
		margin-bottom: var(--space-xl);
	}
	.masthead-title {
		font-family: var(--serif);
		font-weight: 400;
		font-size: clamp(44px, 8vw, 72px);
		line-height: 1;
		letter-spacing: -0.01em;
		text-transform: none;
	}
	.masthead-dek {
		font-family: var(--serif);
		font-style: italic;
		font-size: clamp(16px, 2vw, 19px);
		margin-top: 12px;
		color: var(--ink);
	}

	.entry-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.entry + .entry {
		margin-top: var(--space-xl);
	}

	.entry-link {
		display: block;
		color: var(--ink);
	}

	.kicker {
		display: block;
		font-family: var(--sans);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 10px;
		color: var(--ink);
	}
	.dot {
		margin: 0 8px;
	}

	.entry-title {
		font-family: var(--serif);
		font-weight: 400;
		font-size: clamp(26px, 4vw, 38px);
		line-height: 1.1;
		letter-spacing: -0.01em;
		text-transform: none;
	}
	.entry-link:hover .entry-title {
		text-decoration: underline;
		text-underline-offset: 5px;
		text-decoration-thickness: 1px;
	}

	.entry-desc {
		font-family: var(--serif);
		font-size: clamp(17px, 2.2vw, 20px);
		line-height: 1.5;
		margin-top: 12px;
		max-width: 60ch;
		color: var(--ink);
	}

	.empty {
		font-family: var(--serif);
		font-style: italic;
		color: var(--ink);
	}
</style>
