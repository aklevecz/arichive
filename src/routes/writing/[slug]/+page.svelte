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
		<div class="post-meta">
			{#if meta.date}<time class="post-date">{fmtDate(meta.date)}</time>{/if}
			{#if meta.draft}<span class="draft-tag">Draft</span>{/if}
		</div>
		<h1 class="post-title">{meta.title}</h1>
		{#if meta.description}
			<p class="post-dek">{meta.description}</p>
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
		border-bottom: var(--border-width) solid var(--border-color);
	}

	.post-meta {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin-bottom: var(--space-sm);
	}

	.post-date {
		opacity: 0.5;
	}

	.draft-tag {
		font-weight: 700;
		color: var(--accent-color);
		border: 1px solid var(--accent-color);
		padding: 2px 7px;
	}

	.post-title {
		font-size: clamp(32px, 6vw, 56px);
		line-height: var(--line-height-tight);
	}

	.post-dek {
		margin: var(--space-sm) 0 0;
		font-size: clamp(16px, 2vw, 19px);
		line-height: var(--line-height-body);
		opacity: 0.65;
	}

	.prose {
		font-size: var(--font-size-body);
		line-height: 1.7;
	}

	.prose :global(h2) {
		font-family: var(--font-display);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: -0.01em;
		font-size: clamp(20px, 3vw, 26px);
		line-height: 1.15;
		margin: var(--space-lg) 0 var(--space-sm);
	}

	.prose :global(h3) {
		font-family: var(--font-display);
		font-weight: 700;
		text-transform: uppercase;
		font-size: clamp(16px, 2.5vw, 19px);
		line-height: 1.2;
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
		padding: var(--space-sm) var(--space-md);
		border-left: var(--border-width) solid var(--accent-color);
		background: rgba(0, 0, 0, 0.03);
	}

	.prose :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

	.prose :global(code) {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.9em;
		background: rgba(0, 0, 0, 0.06);
		padding: 1px 5px;
	}

	.prose :global(pre) {
		border: var(--border-width) solid var(--border-color);
		padding: var(--space-sm) var(--space-md);
		overflow-x: auto;
		margin: 0 0 var(--space-md);
	}

	.prose :global(pre code) {
		background: none;
		padding: 0;
	}

	.prose :global(img) {
		max-width: 100%;
		height: auto;
		border: var(--border-width) solid var(--border-color);
	}

	.prose :global(hr) {
		border: none;
		border-top: var(--border-width) solid var(--border-color);
		margin: var(--space-lg) 0;
	}

	.prose :global(table) {
		border-collapse: collapse;
		width: 100%;
		margin: 0 0 var(--space-md);
		font-size: var(--font-size-small);
	}

	.prose :global(th),
	.prose :global(td) {
		border: 1px solid var(--border-color);
		padding: 6px 10px;
		text-align: left;
		vertical-align: top;
	}

	.prose :global(th) {
		font-family: var(--font-display-alt);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: var(--font-size-caption);
	}
</style>
