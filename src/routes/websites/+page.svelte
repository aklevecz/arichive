<script>
	import Seo from '$lib/components/seo.svelte';
	import { featuredSites, moreSites, displayUrl } from '$lib/websites';

	const pad = (n) => String(n).padStart(2, '0');
</script>

<Seo
	title="Websites - Ariel Klevecz"
	description="Websites designed and built by Ariel Klevecz: Good Neighbor, Open Art Institute, yaytso, Office Hours Rec Center and more."
	image="https://klevecz.net/websites/og-websites.png"
	twitterCard="summary_large_image"
/>

<div class="page">
	<header class="masthead">
		<a class="back" href="/">← Ariel Klevecz</a>
		<h1>Websites</h1>
		<p class="thesis">
			Sites I've designed and built for a vinyl pressing plant, a podcast, an art institute, artists,
			album drops and my own experiments. Every one of them is live, so click through.
		</p>
		<div class="links profile">
			<a href="https://www.linkedin.com/in/ariel-klevecz/" target="_blank" rel="noopener">LinkedIn ↗</a>
		</div>
	</header>

	<section>
		<div class="sec-head">
			<span class="n">01</span>
			<h2>Selected</h2>
		</div>

		<ol class="features">
			{#each featuredSites as site, i (site.id)}
				<li class="feature">
					<a class="shot" href={site.url} target="_blank" rel="noopener">
						<img
							src="/websites/{site.id}.jpg"
							alt="Homepage of {site.name}"
							width="1200"
							height="750"
							loading={i < 2 ? 'eager' : 'lazy'}
						/>
					</a>
					<div class="feature-body">
						<span class="index">{pad(i + 1)}</span>
						<h3>{site.name}</h3>
						{#if site.client || site.year}
							<p class="meta">
								{[site.client, site.year].filter(Boolean).join(' · ')}
							</p>
						{/if}
						<p class="desc">{site.description}</p>
						<ul class="tech">
							{#each site.stack as tech}
								<li>{tech}</li>
							{/each}
						</ul>
						<div class="links">
							<a class="visit" href={site.url} target="_blank" rel="noopener">
								{displayUrl(site.url)} ↗
							</a>
							{#if site.project}
								<a class="case" href="/projects/{site.project}">Case study →</a>
							{/if}
						</div>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<section>
		<div class="sec-head">
			<span class="n">02</span>
			<h2>More</h2>
		</div>

		<ul class="grid">
			{#each moreSites as site (site.id)}
				<li class="card">
					<a class="shot" href={site.url} target="_blank" rel="noopener">
						<img
							src="/websites/{site.id}.jpg"
							alt="Homepage of {site.name}"
							width="1200"
							height="750"
							loading="lazy"
						/>
					</a>
					<h3>{site.name}</h3>
					{#if site.client || site.year}
						<p class="meta">{[site.client, site.year].filter(Boolean).join(' · ')}</p>
					{/if}
					<p class="desc">{site.description}</p>
					{#if site.stack.length}
						<p class="stack-line">{site.stack.join(' / ')}</p>
					{/if}
					<div class="links">
						<a class="visit" href={site.url} target="_blank" rel="noopener">
							{displayUrl(site.url)} ↗
						</a>
						{#if site.project}
							<a class="case" href="/projects/{site.project}">Case study →</a>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.page {
		max-width: 1120px;
		margin: 0 auto;
		padding: 0 var(--space-md) var(--space-xl);
		/* Nothing on this page should ever pan sideways on a phone. */
		overflow-x: clip;
	}

	/* ---------- masthead ---------- */
	.masthead {
		padding: var(--space-lg) 0 var(--space-md);
		border-bottom: var(--border-width) solid var(--border-color);
		margin-bottom: var(--space-lg);
	}

	.back {
		display: inline-block;
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 700;
		margin-bottom: var(--space-md);
	}

	.masthead h1 {
		font-size: var(--font-size-hero);
		margin: 0;
	}

	.thesis {
		font-size: clamp(17px, 2.2vw, 21px);
		line-height: 1.45;
		max-width: 36em;
		margin: var(--space-md) 0 0;
	}

	.profile {
		margin-top: var(--space-md);
	}

	section + section {
		margin-top: var(--space-xl);
	}

	.sec-head {
		display: flex;
		align-items: baseline;
		gap: var(--space-sm);
		margin-bottom: var(--space-md);
	}

	.sec-head .n {
		font-size: var(--font-size-caption);
		font-weight: 700;
		letter-spacing: 0.1em;
		opacity: 0.45;
	}

	.sec-head h2 {
		font-size: clamp(22px, 3.4vw, 34px);
	}

	/* ---------- shared ---------- */
	.shot {
		display: block;
		border: var(--border-width) solid var(--border-color);
		overflow: hidden;
		background: var(--bg-color);
	}

	.shot img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		object-position: top;
		transition: transform 0.4s ease;
	}

	/* Mouse only: on touch, a scroll that starts on a screenshot counts as hover,
	   and the zoom made the page wobble sideways. */
	@media (hover: hover) and (pointer: fine) {
		.shot:hover img {
			transform: scale(1.02);
		}
	}

	.meta {
		margin: 0;
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 700;
		opacity: 0.55;
	}

	.desc {
		margin: 0;
		line-height: 1.5;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs) var(--space-md);
		font-size: var(--font-size-small);
		font-weight: 700;
	}

	.links a {
		border-bottom: 1px solid currentColor;
		padding-bottom: 1px;
		overflow-wrap: anywhere;
	}

	/* ---------- selected ---------- */
	.features {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.feature {
		display: grid;
		grid-template-columns: 3fr 2fr;
		gap: var(--space-md);
		align-items: start;
		padding: var(--space-lg) 0;
		border-top: var(--border-width) solid var(--border-color);
	}

	.feature:first-child {
		border-top: none;
		padding-top: 0;
	}

	.feature-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.index {
		font-family: var(--font-display);
		font-size: clamp(40px, 6vw, 72px);
		font-weight: 900;
		line-height: var(--line-height-tight);
		letter-spacing: -0.03em;
	}

	.feature h3 {
		font-size: clamp(24px, 3vw, 34px);
		line-height: 1.05;
	}

	.feature .desc {
		font-size: 17px;
	}

	.tech {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.tech li {
		border: 1px solid var(--border-color);
		padding: 3px 8px;
		font-size: var(--font-size-caption);
		font-weight: 600;
		letter-spacing: 0.02em;
	}

	/* ---------- more ---------- */
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-lg) var(--space-md);
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.card .shot {
		margin-bottom: var(--space-xs);
	}

	.card h3 {
		font-size: 20px;
		line-height: 1.15;
	}

	.card .desc {
		font-size: var(--font-size-small);
	}

	.stack-line {
		margin: 0;
		font-size: var(--font-size-caption);
		opacity: 0.6;
	}

	.card .links {
		margin-top: auto;
		padding-top: var(--space-xs);
	}

	@media (max-width: 900px) {
		.feature {
			grid-template-columns: 1fr;
		}

		.grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.page {
			padding: 0 var(--space-sm) var(--space-lg);
		}

		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
