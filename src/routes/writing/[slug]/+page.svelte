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
		<span class="kicker">
			{meta.section}{#if meta.date}<span class="dot">·</span>{fmtDate(meta.date)}{/if}{#if meta.draft}<span class="dot">·</span>Draft{/if}
		</span>
		<h1 class="post-title">{meta.title}</h1>
		{#if meta.description}
			<p class="standfirst">{meta.description}</p>
		{/if}
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
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: var(--space-lg);
		color: var(--ink);
	}

	.post-head {
		margin-bottom: var(--space-lg);
	}
	.kicker {
		display: block;
		font-family: var(--sans);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin-bottom: 14px;
		color: var(--ink);
	}
	.dot {
		margin: 0 8px;
	}
	.post-title {
		font-family: var(--serif);
		font-weight: 400;
		font-size: clamp(34px, 6vw, 54px);
		line-height: 1.08;
		letter-spacing: -0.015em;
		text-transform: none;
	}
	.standfirst {
		font-family: var(--serif);
		font-style: italic;
		font-size: clamp(18px, 2.4vw, 23px);
		line-height: 1.45;
		margin-top: 16px;
		color: var(--ink);
	}

	.prose {
		font-family: var(--serif);
		font-size: clamp(18px, 2.2vw, 20px);
		line-height: 1.65;
	}

	.prose :global(h2) {
		font-family: var(--serif);
		font-weight: 400;
		font-size: clamp(24px, 3vw, 30px);
		line-height: 1.2;
		letter-spacing: -0.01em;
		text-transform: none;
		margin: var(--space-lg) 0 var(--space-sm);
	}
	.prose :global(h3) {
		font-family: var(--serif);
		font-weight: 400;
		font-style: italic;
		font-size: clamp(20px, 2.5vw, 24px);
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
	}

	.prose :global(em),
	.prose :global(i) {
		font-style: italic;
	}

	.prose :global(blockquote) {
		font-family: var(--serif);
		font-style: italic;
		font-size: clamp(20px, 2.6vw, 24px);
		line-height: 1.45;
		margin: var(--space-lg) 0;
	}
	.prose :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

	.prose :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.82em;
		background: rgba(128, 128, 128, 0.15);
		padding: 1px 5px;
		border-radius: 2px;
	}
	.prose :global(pre) {
		font-size: 0.95em;
		background: rgba(128, 128, 128, 0.12);
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
		margin: var(--space-md) 0;
	}

	/* author-intended breaks become quiet whitespace, not a line */
	.prose :global(hr) {
		border: none;
		height: 0;
		margin: var(--space-xl) 0;
	}

	.prose :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: var(--space-md) 0;
		font-size: 0.92em;
	}
	.prose :global(th),
	.prose :global(td) {
		padding: 8px 10px;
		text-align: left;
		vertical-align: top;
	}
	.prose :global(tbody tr:nth-child(odd)) {
		background: rgba(128, 128, 128, 0.1);
	}
	.prose :global(th) {
		font-family: var(--sans);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		font-size: 11px;
		font-weight: 400;
	}
</style>
