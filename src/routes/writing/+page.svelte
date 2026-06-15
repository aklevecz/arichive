<script>
	import Seo from '$lib/components/seo.svelte';

	const { data } = $props();

	// One chronological list; the kicker carries the section
	const entries = $derived(
		[...data.writing, ...data.research].sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		)
	);

	const lead = $derived(entries[0]);
	const rest = $derived(entries.slice(1));

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
		<a href={`/writing/${lead.slug}`} class="lead">
			<span class="kicker">
				<span class="kicker-section">{lead.section}</span>
				{#if lead.draft}<span class="draft-tag">Draft</span>{/if}
			</span>
			<h2 class="lead-title">{lead.title}</h2>
			{#if lead.description}<p class="lead-desc">{lead.description}</p>{/if}
			{#if lead.date}<time class="byline">{fmtDate(lead.date)}</time>{/if}
		</a>

		{#if rest.length}
			<ul class="entry-list">
				{#each rest as entry}
					<li class="entry">
						<a href={`/writing/${entry.slug}`} class="entry-link">
							<span class="kicker">
								<span class="kicker-section">{entry.section}</span>
								{#if entry.draft}<span class="draft-tag">Draft</span>{/if}
							</span>
							<h3 class="entry-title">{entry.title}</h3>
							{#if entry.description}<p class="entry-desc">{entry.description}</p>{/if}
							{#if entry.date}<time class="byline">{fmtDate(entry.date)}</time>{/if}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	{/if}
</div>

<style>
	.writing-page {
		max-width: 720px;
		margin: 0 auto;
		padding: var(--space-lg) var(--space-md) var(--space-xl);
		color: var(--ink);
	}

	.back-link {
		display: inline-block;
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		opacity: 0.55;
		margin-bottom: var(--space-lg);
	}
	.back-link:hover {
		color: var(--ink);
		opacity: 1;
	}

	/* ---- masthead (NYT section front) ---- */
	.masthead {
		text-align: center;
		border-bottom: 1px solid var(--rule);
		padding-bottom: var(--space-md);
		margin-bottom: var(--space-lg);
	}
	.masthead-title {
		font-family: var(--serif);
		font-weight: 600;
		font-size: clamp(40px, 8vw, 72px);
		line-height: 1;
		letter-spacing: -0.01em;
		text-transform: none;
	}
	.masthead-dek {
		font-family: var(--serif);
		font-style: italic;
		font-size: clamp(15px, 2vw, 18px);
		opacity: 0.6;
		margin-top: 10px;
	}

	/* ---- shared kicker + byline ---- */
	.kicker {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 8px;
	}
	.kicker-section {
		color: var(--accent-color);
	}
	.draft-tag {
		font-weight: 700;
		color: var(--accent-color);
		border: 1px solid var(--accent-color);
		padding: 1px 6px;
		letter-spacing: 0.1em;
	}
	.byline {
		display: block;
		font-family: var(--sans);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		opacity: 0.45;
		margin-top: 12px;
	}

	/* ---- lead story ---- */
	.lead {
		display: block;
		color: var(--ink);
		padding-bottom: var(--space-lg);
		margin-bottom: var(--space-md);
		border-bottom: 1px solid var(--rule);
	}
	.lead:hover {
		color: var(--ink);
	}
	.lead-title {
		font-family: var(--serif);
		font-weight: 600;
		font-size: clamp(30px, 5.5vw, 48px);
		line-height: 1.08;
		letter-spacing: -0.015em;
		text-transform: none;
	}
	.lead:hover .lead-title {
		text-decoration: underline;
		text-underline-offset: 5px;
		text-decoration-thickness: 1px;
	}
	.lead-desc {
		font-family: var(--serif);
		font-size: clamp(17px, 2.4vw, 21px);
		line-height: 1.5;
		opacity: 0.78;
		margin-top: 12px;
	}

	/* ---- list ---- */
	.entry-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.entry {
		border-bottom: 1px solid var(--rule);
	}
	.entry:last-child {
		border-bottom: none;
	}
	.entry-link {
		display: block;
		color: var(--ink);
		padding: var(--space-md) 0;
	}
	.entry-link:hover {
		color: var(--ink);
	}
	.entry-title {
		font-family: var(--serif);
		font-weight: 600;
		font-size: clamp(22px, 3.2vw, 30px);
		line-height: 1.12;
		letter-spacing: -0.01em;
		text-transform: none;
	}
	.entry-link:hover .entry-title {
		text-decoration: underline;
		text-underline-offset: 4px;
		text-decoration-thickness: 1px;
	}
	.entry-desc {
		font-family: var(--serif);
		font-size: clamp(15px, 2vw, 18px);
		line-height: 1.5;
		opacity: 0.7;
		margin-top: 8px;
		max-width: 60ch;
	}

	.empty {
		font-family: var(--serif);
		font-style: italic;
		opacity: 0.5;
		text-align: center;
	}
</style>
