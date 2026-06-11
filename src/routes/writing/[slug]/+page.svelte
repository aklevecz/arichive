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
		<h1 class="post-title">
			{meta.title}
			{#if meta.draft}<span class="draft-tag">Draft</span>{/if}
		</h1>
		{#if meta.date}<time class="post-date">{fmtDate(meta.date)}</time>{/if}
	</header>

	<div class="prose">
		<Content />
	</div>
</article>

<style>
	.post {
		max-width: 680px;
		margin: 0 auto;
		padding: var(--space-lg) var(--space-md);
	}

	.back-link {
		display: inline-block;
		font-size: var(--font-size-small);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.55;
		margin-bottom: var(--space-md);
	}

	.post-head {
		margin-bottom: var(--space-lg);
		padding-bottom: var(--space-md);
		border-bottom: 1px solid var(--border-color);
	}

	.post-title {
		font-family: var(--font-display);
		font-size: clamp(28px, 5vw, 44px);
		font-weight: 700;
		text-transform: none;
		letter-spacing: -0.01em;
		line-height: 1.1;
	}

	.draft-tag {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border: 1px solid var(--border-color);
		padding: 2px 6px;
		margin-left: 8px;
		vertical-align: middle;
		opacity: 0.5;
	}

	.post-date {
		display: block;
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		opacity: 0.5;
		margin-top: var(--space-xs);
	}

	.prose {
		font-size: var(--font-size-body);
		line-height: 1.7;
	}

	.prose :global(h2) {
		font-family: var(--font-display);
		font-size: clamp(20px, 3vw, 26px);
		font-weight: 700;
		text-transform: none;
		letter-spacing: 0;
		margin: var(--space-lg) 0 var(--space-sm);
	}

	.prose :global(h3) {
		font-family: var(--font-display);
		font-size: clamp(17px, 2.5vw, 20px);
		font-weight: 700;
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
		margin-bottom: var(--space-xs);
	}

	.prose :global(a) {
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.prose :global(blockquote) {
		margin: var(--space-md) 0;
		padding-left: var(--space-md);
		border-left: 3px solid var(--border-color);
		opacity: 0.8;
		font-style: italic;
	}

	.prose :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.9em;
		background: rgba(0, 0, 0, 0.06);
		padding: 1px 5px;
		border-radius: 3px;
	}

	.prose :global(pre) {
		background: rgba(0, 0, 0, 0.06);
		padding: var(--space-sm) var(--space-md);
		overflow-x: auto;
		margin: 0 0 var(--space-md);
	}

	.prose :global(pre code) {
		background: none;
		padding: 0;
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid var(--border-color);
		margin: var(--space-lg) 0;
	}
</style>
