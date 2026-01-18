<script>
	import { browser } from '$app/environment';
	import WebglBackground from '$lib/components/webgl-background.svelte';
	import ApplyFilters from '$lib/components/apply-filters.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import filter from '$lib/stores/filter.svelte';
	import projects from '$lib/stores/projects.svelte';

	const meImg = 'https://eggs.yaytso.art/tokens/egg-token.png';

	let menuOpen = $state(false);
	let showProjects = $state(false);

	// Check sessionStorage on mount
	$effect(() => {
		if (browser) {
			const stored = sessionStorage.getItem('showProjects');
			if (stored === 'true') {
				showProjects = true;
			}
		}
	});

	// Persist state to sessionStorage when it changes
	$effect(() => {
		if (browser && showProjects) {
			sessionStorage.setItem('showProjects', 'true');
		}
	});

	let filteredProjects = $derived(
		projects.state.filter(projects.searchFilter).filter(projects.categoryFilter)
	);

	// Group projects by type
	let personalProjects = $derived(filteredProjects.filter(p => p.type === 'personal'));
	let technicalProjects = $derived(filteredProjects.filter(p => p.type === 'technical'));

	// Category descriptions
	/** @type {Record<string, string>} */
	const categoryDescriptions = {
		'ai': 'utilizing advanced generative artificial intelligence systems',
		'ar': 'implementing augmented reality technology',
		'digital art': 'creating computational creative works',
		'event': 'designing experiential gatherings',
		'events': 'designing experiential gatherings',
		'web': 'developing modern web applications',
		'ticketing': 'building event ticketing systems',
		'sveltekit': 'architected using SvelteKit',
		'cloudflare': 'deployed on Cloudflare',
		'stripe': 'integrating Stripe payments',
		'music': 'exploring technology and music',
		'audio reactive': 'responding dynamically to audio',
		'touchdesigner': 'utilizing TouchDesigner',
		'office hours': 'collaborating with Office Hours',
		'ios': 'developing native iOS applications',
		'egg': 'incorporating egg-themed elements',
		'eggs': 'incorporating egg-themed elements',
		'art': 'pursuing artistic endeavors',
		'3d': 'creating three-dimensional content',
		'nft': 'developing blockchain collectibles',
		'react': 'built using React',
		'ipfs': 'leveraging IPFS storage',
		'ethereum': 'utilizing Ethereum',
		'fine art': 'showcasing traditional art',
		'paintings': 'featuring painted works',
		'astro': 'developed with Astro',
		'llm': 'integrating large language models',
		'instagram': 'connecting with Instagram',
		'dogs': 'celebrating canine companions',
		'chicken art': 'featuring poultry-inspired artwork',
		'nfc': 'implementing NFC technology',
		'games': 'designing interactive games',
		'scavenger hunts': 'creating treasure-seeking adventures',
		'booping': 'encouraging tactile NFC interaction',
		'qr code': 'generating machine-readable codes',
		'ecommerce': 'building online commerce',
		'coffee': 'celebrating coffee culture',
		'fashion': 'exploring fashion and technology',
		'finetuning': 'employing ML model refinement',
		'lora': 'utilizing low-rank adaptation'
	};

	/**
	 * @param {string} category
	 */
	function getCategoryDescription(category) {
		return categoryDescriptions[category.toLowerCase()] || category;
	}

	/**
	 * @param {MouseEvent} e
	 */
	function scrollToProjects(e) {
		e.preventDefault();
		showProjects = true;
		// Small delay to let the section render before scrolling
		setTimeout(() => {
			const projectsSection = document.getElementById('projects-section');
			if (projectsSection) {
				projectsSection.scrollIntoView({ behavior: 'smooth' });
			}
		}, 50);
	}

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
	<div class="hero-section">
		<h1 class="site-name">ARIEL<br/>KLEVECZ</h1>
		<p class="tagline">Mad Scientist</p>

		<button class="enter-button" onclick={scrollToProjects}>
			Enter
		</button>
	</div>

	{#if showProjects}
		<div id="projects-section" class="projects-section">
			<div class="projects-header">
				<button onclick={() => menuOpen = !menuOpen} class="menu-toggle">
					{menuOpen ? '× Close' : '+ Filter'}
				</button>
			</div>

			{#if menuOpen}
				<div class="utility-section">
					<SearchBar />
					<ApplyFilters />
				</div>
			{/if}

			{#if filteredProjects.length === 0}
				<div class="empty-state">
					<div>Nothing found</div>
					<button onclick={filter.resetFilters}>Reset</button>
				</div>
			{/if}

			{#if personalProjects.length > 0}
				<div class="type-section">
					<h2 class="type-heading">Projects</h2>
					<div class="projects-grid">
						{#each personalProjects as project, i}
							<a href={`/projects/${project.id}`} class="project-card" style="--delay: {i * 0.05}s; --rotate: {(i % 3 - 1) * 1.5}deg">
								<span class="project-name">{project.name}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if technicalProjects.length > 0}
				<div class="type-section">
					<h2 class="type-heading">Other Work</h2>
					<div class="projects-grid">
						{#each technicalProjects as project, i}
							<a href={`/projects/${project.id}`} class="project-card" style="--delay: {i * 0.05}s; --rotate: {(i % 3 - 1) * 1.5}deg">
								<span class="project-name">{project.name}</span>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.homepage {
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--space-lg);
	}

	/* Hero - bold, centered, playful */
	.hero-section {
		min-height: 80vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		position: relative;
	}

	.site-name {
		font-family: var(--font-display);
		font-size: clamp(60px, 15vw, 180px);
		font-weight: 900;
		line-height: 0.85;
		margin: 0;
		letter-spacing: -0.04em;
		text-transform: uppercase;
		color: white;
		mix-blend-mode: difference;
	}

	.tagline {
		font-family: var(--font-body);
		font-size: clamp(14px, 2vw, 20px);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.3em;
		margin: var(--space-md) 0 0 0;
		opacity: 0.8;
		color: white;
		mix-blend-mode: difference;
	}

	.enter-button {
		margin-top: var(--space-xl);
		font-family: var(--font-display);
		font-size: clamp(16px, 2vw, 20px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		padding: var(--space-md) var(--space-xl);
		border: 3px solid white;
		background: transparent;
		color: white;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		mix-blend-mode: difference;
	}

	.enter-button:hover {
		background: var(--text-color);
		color: var(--bg-color);
		transform: scale(1.05) rotate(-2deg);
		box-shadow: none;
	}

	/* Projects section */
	.projects-section {
		padding-top: var(--space-xl);
		animation: slideUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(60px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.projects-header {
		margin-bottom: var(--space-lg);
		display: flex;
		justify-content: flex-end;
	}

	.menu-toggle {
		font-family: var(--font-display);
		font-size: 14px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		padding: var(--space-sm) var(--space-md);
		border: 2px solid var(--text-color);
		background: transparent;
		color: var(--text-color);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.menu-toggle:hover {
		background: var(--text-color);
		color: var(--bg-color);
		transform: none;
		box-shadow: none;
	}

	.utility-section {
		margin-bottom: var(--space-lg);
		padding: var(--space-md);
		border: 2px solid var(--text-color);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	/* Type sections */
	.type-section {
		margin-bottom: var(--space-xl);
	}

	.type-heading {
		font-family: var(--font-display);
		font-size: clamp(36px, 8vw, 80px);
		font-weight: 900;
		margin: 0 0 var(--space-lg) 0;
		letter-spacing: -0.03em;
		text-transform: uppercase;
		line-height: 0.9;
	}

	/* Projects grid - playful, varied layout */
	.projects-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.project-card {
		display: inline-block;
		padding: var(--space-sm) var(--space-md);
		border: 2px solid var(--text-color);
		text-decoration: none;
		color: var(--text-color);
		transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
		animation-delay: var(--delay, 0s);
		transform: rotate(var(--rotate, 0deg));
	}

	.project-card:hover {
		background: var(--text-color);
		color: var(--bg-color);
		transform: scale(1.1) rotate(calc(var(--rotate, 0deg) * -2));
		z-index: 10;
	}

	@keyframes popIn {
		from {
			opacity: 0;
			transform: scale(0.8) rotate(var(--rotate, 0deg));
		}
		to {
			opacity: 1;
			transform: scale(1) rotate(var(--rotate, 0deg));
		}
	}

	.project-name {
		font-family: var(--font-display);
		font-size: clamp(14px, 2vw, 18px);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	/* Color accents for different sections */
	.type-section:nth-child(2) .project-card:hover {
		background: #0074D9;
		border-color: #0074D9;
	}

	.type-section:nth-child(3) .project-card:hover {
		background: #FF4136;
		border-color: #FF4136;
	}

	.empty-state {
		padding: var(--space-xl);
		text-align: center;
		font-family: var(--font-display);
		font-size: 24px;
		text-transform: uppercase;
	}

	.empty-state button {
		margin-top: var(--space-md);
		font-family: var(--font-display);
		font-size: 14px;
		padding: var(--space-sm) var(--space-md);
		border: 2px solid var(--text-color);
		background: transparent;
		text-transform: uppercase;
	}

	.empty-state button:hover {
		background: var(--text-color);
		color: var(--bg-color);
	}

	/* Mobile */
	@media (max-width: 768px) {
		.homepage {
			padding: var(--space-md);
		}

		.hero-section {
			min-height: 70vh;
		}

		.site-name {
			font-size: clamp(48px, 18vw, 100px);
		}

		.enter-button {
			padding: var(--space-sm) var(--space-lg);
		}

		.type-heading {
			font-size: clamp(28px, 10vw, 48px);
		}

		.projects-grid {
			gap: var(--space-xs);
		}

		.project-card {
			padding: var(--space-xs) var(--space-sm);
			transform: none;
		}

		.project-card:hover {
			transform: scale(1.05);
		}

		.project-name {
			font-size: 12px;
		}
	}
</style>
