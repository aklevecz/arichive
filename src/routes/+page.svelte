<script>
	import WebglBackground from '$lib/components/webgl-background.svelte';

	const meImg = 'https://eggs.yaytso.art/tokens/egg-token.png';

	const seo = {
		title: 'Ariel Klevecz',
		description: 'Ariel Klevecz - Mad Scientist',
		keywords: 'web development, ai, stable diffusion, finetuning, lora, nfts, web3',
		author: 'Ariel Klevecz',
		ogTitle: 'Ariel Klevecz',
		ogDescription: 'Ariel Klevecz - Mad Scientist',
		ogImage: meImg,
		ogUrl: 'https://klevecz.net',
		twitterCard: 'summary_large_image',
		twitterTitle: 'Ariel Klevecz',
		twitterDescription: 'Ariel Klevecz - Mad Scientist',
		twitterImage: meImg
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />
	<meta name="author" content={seo.author} />
	<meta property="og:title" content={seo.ogTitle} />
	<meta property="og:description" content={seo.ogDescription} />
	<meta property="og:image" content={seo.ogImage} />
	<meta property="og:url" content={seo.ogUrl} />
	<meta name="twitter:card" content={seo.twitterCard} />
	<meta name="twitter:title" content={seo.twitterTitle} />
	<meta name="twitter:description" content={seo.twitterDescription} />
	<meta name="twitter:image" content={seo.twitterImage} />
</svelte:head>

<WebglBackground />

<div class="homepage">
	<div class="nameplate">
		<h1 class="site-name">ARIEL KLEVECZ</h1>
		<p class="tagline">Mad Scientist</p>
	</div>

	<div class="lead-content">
		<p class="lead-paragraph">
			Building at the intersection of art and technology. Exploring generative AI, augmented reality,
			web applications, and interactive experiences.
		</p>
	</div>

	<nav class="sections">
		<a href="/projects" class="section-link">Projects</a>
		<a href="/consulting" class="section-link">AI Consulting</a>
	</nav>
</div>

<style>
	.homepage {
		max-width: 1200px;
		margin: 0 auto;
		padding: var(--space-xl) var(--space-lg);
	}

	/* Newspaper nameplate */
	.nameplate {
		border-bottom: 4px double #000;
		padding-bottom: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	.site-name {
		font-family: var(--font-display);
		font-size: clamp(40px, 8vw, 72px);
		font-weight: 700;
		line-height: 1;
		margin: 0;
		letter-spacing: 0.05em;
	}

	.tagline {
		font-family: var(--font-body);
		font-size: clamp(12px, 2vw, 14px);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.3em;
		margin: var(--space-xs) 0 0 0;
		opacity: 0.6;
	}

	/* Lead content */
	.lead-content {
		border-bottom: 1px solid #ddd;
		padding-bottom: var(--space-lg);
		margin-bottom: var(--space-md);
	}

	.lead-paragraph {
		font-family: var(--font-body);
		font-size: clamp(17px, 2.5vw, 21px);
		line-height: 1.6;
		margin: 0;
		max-width: 600px;
	}

	/* Navigation sections */
	.sections {
		display: flex;
		gap: var(--space-lg);
		flex-wrap: wrap;
	}

	.section-link {
		font-family: var(--font-body);
		font-size: clamp(16px, 2vw, 18px);
		font-weight: 700;
		text-decoration: none;
		color: var(--text-color);
		border-bottom: 1px solid var(--text-color);
		padding-bottom: 2px;
		transition: border-bottom-width 0.2s ease;
	}

	.section-link:hover {
		border-bottom-width: 2px;
	}

	@media (max-width: 768px) {
		.homepage {
			padding: var(--space-lg) var(--space-md);
		}

		.nameplate {
			border-bottom-width: 3px;
		}

		.lead-paragraph {
			font-size: var(--font-size-body);
		}
	}
</style>
