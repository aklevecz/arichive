<script>
	import Seo from '$lib/components/seo.svelte';

	const { data } = $props();

	const Content = $derived(data.component);
	const meta = $derived(data.meta);

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

<Seo
	title={meta.title ? `${meta.title} - Ariel Klevecz` : 'Writing - Ariel Klevecz'}
	description={meta.description || 'Writing and research by Ariel Klevecz'}
	type="article"
/>

<article class="post">
	<a href="/writing" class="back-link">&larr; Writing</a>

	<header class="post-head">
		<div class="kicker">
			{#if meta.section}<span class="kicker-section">{meta.section}</span>{/if}
			{#if meta.draft}<span class="draft-tag">Draft</span>{/if}
		</div>
		<h1 class="post-title">{meta.title}</h1>
		{#if meta.description}
			<p class="standfirst">{meta.description}</p>
		{/if}
		{#if meta.date}<time class="byline">{fmtDate(meta.date)}</time>{/if}
	</header>

	<div class="prose">
		<Content />
	</div>
</article>

<style>
	.post {
		max-width: 680px;
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

	/* ---- headline block ---- */
	.post-head {
		text-align: center;
		max-width: 620px;
		margin: 0 auto var(--space-lg);
		padding-bottom: var(--space-md);
		border-bottom: 1px solid var(--rule);
	}
	.kicker {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		font-family: var(--sans);
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		margin-bottom: 14px;
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
	.post-title {
		font-family: var(--serif);
		font-weight: 700;
		font-size: clamp(32px, 6vw, 54px);
		line-height: 1.06;
		letter-spacing: -0.02em;
		text-transform: none;
	}
	.standfirst {
		font-family: var(--serif);
		font-style: italic;
		font-size: clamp(17px, 2.4vw, 22px);
		line-height: 1.45;
		opacity: 0.72;
		margin-top: 16px;
	}
	.byline {
		display: block;
		font-family: var(--sans);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		opacity: 0.5;
		margin-top: 18px;
	}

	/* ---- body ---- */
	.prose {
		font-family: var(--serif);
		font-size: clamp(18px, 2.2vw, 20px);
		line-height: 1.65;
		letter-spacing: -0.002em;
	}

	/* drop cap on the first paragraph */
	.prose :global(> p:first-of-type::first-letter) {
		float: left;
		font-family: var(--serif);
		font-weight: 700;
		font-size: 3.4em;
		line-height: 0.72;
		padding: 6px 10px 0 0;
	}

	.prose :global(h2) {
		font-family: var(--serif);
		font-weight: 700;
		font-size: clamp(23px, 3vw, 29px);
		line-height: 1.2;
		letter-spacing: -0.01em;
		text-transform: none;
		margin: var(--space-lg) 0 var(--space-sm);
	}
	.prose :global(h3) {
		font-family: var(--serif);
		font-weight: 600;
		font-style: italic;
		font-size: clamp(19px, 2.5vw, 23px);
		line-height: 1.25;
		text-transform: none;
		letter-spacing: 0;
		margin: var(--space-md) 0 var(--space-xs);
	}

	.prose :global(p) {
		margin: 0 0 var(--space-md);
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin: 0 0 var(--space-md);
		padding-left: 1.4em;
	}
	.prose :global(li) {
		margin-bottom: 6px;
	}

	.prose :global(a) {
		color: var(--ink);
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-thickness: 1px;
		text-decoration-color: var(--accent-color);
	}
	.prose :global(a:hover) {
		color: var(--accent-color);
	}

	.prose :global(em),
	.prose :global(i) {
		font-style: italic;
	}
	.prose :global(strong) {
		font-weight: 700;
	}

	.prose :global(blockquote) {
		font-family: var(--serif);
		font-style: italic;
		font-size: clamp(20px, 2.6vw, 24px);
		line-height: 1.4;
		margin: var(--space-lg) auto;
		padding: 0 var(--space-md);
		max-width: 90%;
		text-align: center;
		opacity: 0.85;
	}
	.prose :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

	.prose :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.82em;
		background: rgba(0, 0, 0, 0.05);
		padding: 1px 5px;
		border-radius: 2px;
	}
	.prose :global(pre) {
		font-size: 0.95em;
		background: rgba(0, 0, 0, 0.04);
		border: 1px solid var(--rule);
		padding: var(--space-sm) var(--space-md);
		overflow-x: auto;
		margin: 0 0 var(--space-md);
		line-height: 1.5;
	}
	.prose :global(pre code) {
		background: none;
		padding: 0;
		font-size: 1em;
	}

	.prose :global(img) {
		max-width: 100%;
		height: auto;
		display: block;
		margin: var(--space-md) auto;
	}

	.prose :global(hr) {
		border: none;
		width: 60px;
		margin: var(--space-lg) auto;
		text-align: center;
	}
	.prose :global(hr::after) {
		content: '* * *';
		display: block;
		font-family: var(--serif);
		letter-spacing: 0.4em;
		opacity: 0.5;
	}

	.prose :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: var(--space-md) 0;
		font-size: 0.92em;
	}
	.prose :global(th),
	.prose :global(td) {
		border-bottom: 1px solid var(--rule);
		padding: 8px 10px;
		text-align: left;
		vertical-align: top;
	}
	.prose :global(th) {
		font-family: var(--sans);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: 11px;
		font-weight: 700;
	}
</style>
