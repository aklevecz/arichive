<script>
	import ApplyFilters from '$lib/components/apply-filters.svelte';
	import Header from '$lib/components/header.svelte';
	import SearchBar from '$lib/components/search-bar.svelte';
	import filter from '$lib/stores/filter.svelte';
	import projects from '$lib/stores/projects.svelte';

	let filteredProjects = $derived(
		projects.state.filter(projects.searchFilter).filter(projects.categoryFilter)
	);
	const meImg = 'https://eggs.yaytso.art/tokens/egg-token.png';

	let menuOpen = $state(false);

	// Category descriptions - longer descriptive phrases for newspaper paragraph style
	/** @type {Record<string, string>} */
	const categoryDescriptions = {
		'ai': 'utilizing advanced generative artificial intelligence systems and machine learning algorithms to create novel visual and interactive experiences',
		'ar': 'implementing augmented reality technology to overlay digital content onto the physical world through mobile devices and specialized hardware',
		'digital art': 'creating computational creative works that exist at the intersection of technology and artistic expression',
		'event': 'designing and producing experiential gatherings that bring people together around shared interests and creative activities',
		'events': 'designing and producing experiential gatherings that bring people together around shared interests and creative activities',
		'web': 'developing modern web applications with responsive design and interactive user interfaces',
		'ticketing': 'building event ticketing systems with custom features including dynamic pricing and digital ticket management',
		'sveltekit': 'architected using the SvelteKit framework for optimal performance and developer experience',
		'cloudflare': 'deployed on Cloudflare\'s edge network for global distribution and enhanced security',
		'stripe': 'integrating Stripe payment processing for secure and reliable transaction handling',
		'music': 'exploring the intersection of technology and musical creation, distribution, and fan engagement',
		'audio reactive': 'developing systems that respond dynamically to audio input and musical frequencies in real-time',
		'touchdesigner': 'utilizing TouchDesigner\'s node-based visual programming environment for real-time interactive multimedia content',
		'office hours': 'collaborating with the Office Hours podcast to build digital experiences for their community',
		'ios': 'developing native iOS applications using Swift and Apple\'s latest frameworks including ARKit and VisionOS',
		'egg': 'incorporating egg-themed elements and playful iconography into creative digital projects',
		'eggs': 'incorporating egg-themed elements and playful iconography into creative digital projects',
		'art': 'pursuing artistic endeavors that challenge conventional boundaries between traditional and digital media',
		'3d': 'creating three-dimensional rendered content using modern graphics engines and modeling software',
		'nft': 'developing blockchain-based collectibles and digital assets on various distributed ledger platforms',
		'react': 'built using React\'s component-based architecture for scalable user interface development',
		'ipfs': 'leveraging the InterPlanetary File System for decentralized and persistent content storage',
		'ethereum': 'utilizing the Ethereum blockchain network for smart contract deployment and decentralized applications',
		'fine art': 'showcasing traditional artistic practices including painting and physical media creation',
		'paintings': 'featuring painted works that demonstrate mastery of color, composition, and technique',
		'astro': 'developed with Astro\'s modern static site generator for optimized performance and content delivery',
		'llm': 'integrating large language models to create conversational interfaces and intelligent content generation',
		'instagram': 'connecting with Instagram\'s platform to share and display photographic content',
		'dogs': 'celebrating canine companions through creative digital projects and artistic representation',
		'chicken art': 'featuring unique poultry-inspired artwork and whimsical chicken-themed creative expressions',
		'nfc': 'implementing near-field communication technology for contactless interaction and physical-digital bridges',
		'games': 'designing interactive gaming experiences that engage users through playful mechanics and challenges',
		'scavenger hunts': 'creating treasure-seeking adventures that combine physical exploration with digital interaction',
		'booping': 'encouraging playful tactile interaction through NFC tag scanning and physical engagement',
		'qr code': 'generating machine-readable codes that blend aesthetic design with functional scanning capabilities',
		'ecommerce': 'building online commerce platforms with custom checkout flows and inventory management',
		'coffee': 'celebrating coffee culture through digital experiences and e-commerce applications',
		'fashion': 'exploring avant-garde clothing design and the intersection of fashion with emerging technologies',
		'finetuning': 'employing machine learning model refinement techniques to achieve specific artistic and functional outcomes',
		'lora': 'utilizing low-rank adaptation methods for efficient fine-tuning of large-scale AI models'
	};

	/**
	 * Get description for a category
	 * @param {string} category
	 */
	function getCategoryDescription(category) {
		return categoryDescriptions[category.toLowerCase()] || category;
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
<div class="newspaper-page">
	<!-- All content flows in newspaper columns -->
	<div class="newspaper-columns">
		<!-- Masthead starts in first column -->
		<div class="masthead">
			<Header />
		</div>

		<!-- Menu toggle button -->
		<div class="menu-toggle-section">
			<button onclick={() => menuOpen = !menuOpen} class="menu-toggle">
				{menuOpen ? 'Close Menu' : 'Search & Filter'}
			</button>
		</div>

		<!-- Search/filters menu (collapsible) -->
		{#if menuOpen}
			<div class="utility-section">
				<SearchBar />
				<ApplyFilters />
			</div>
		{/if}

		<!-- Empty state if needed -->
		{#if filteredProjects.length === 0}
			<div class="empty-state">
				<div>No projects found for selected filters</div>
				<button onclick={filter.resetFilters}>Clear filters</button>
			</div>
		{/if}

		<!-- Projects flow in columns -->
		{#snippet projectLine(/** @type {Project} */ project)}
			<a href={`/projects/${project.id}`} class="article-item">
				<p class="article-paragraph">
					<strong class="project-item-name">{project.name}</strong> — {#each project.categories as category, i}<span class="category-phrase">{getCategoryDescription(category)}{i < project.categories.length - 1 ? ', ' : '.'}</span>{/each}
				</p>
			</a>
		{/snippet}
		{#each filteredProjects as project}
			{@render projectLine(project)}
		{/each}
	</div>
</div>

<style>
	/* ========================================
	   NEWSPAPER LAYOUT (Purist/NYT Theme)
	   ======================================== */

	.newspaper-page {
		width: 100%;
	}

	/* Everything flows in columns */
	.newspaper-columns {
		column-count: 1;
		column-gap: var(--space-xl);
		column-rule: 1px solid var(--border-color);
	}

	/* Masthead sits in first column */
	.masthead {
		break-inside: avoid;
	}

	/* Menu toggle section */
	.menu-toggle-section {
		break-inside: avoid;
		margin-bottom: var(--space-sm);
	}

	.menu-toggle {
		display: inline-block;
		font-family: var(--font-body);
		font-size: var(--font-size-small);
		padding: var(--space-xs) var(--space-sm);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		cursor: pointer;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-weight: 600;
	}

	/* Utility section flows in columns */
	.utility-section {
		break-inside: avoid;
		margin-bottom: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	/* Articles flow in columns */
	.article-item {
		display: block;
		padding: 0;
		margin-bottom: var(--space-lg);
		break-inside: avoid;
		page-break-inside: avoid;
		text-decoration: none;
	}

	.article-paragraph {
		margin: 0;
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		color: var(--text-color);
	}

	/* NYT/Purist newspaper columns - desktop */
	:global(body[data-theme="purist"]) .newspaper-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	:global(body[data-theme="purist"]) .newspaper-columns {
		column-count: 3;
		column-gap: 40px;
		column-rule: 1px solid #e0e0e0;
	}

	:global(body[data-theme="purist"]) .menu-toggle {
		border: none;
		background: transparent;
		padding: 0;
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-thickness: 1px;
		text-transform: none;
		letter-spacing: 0;
		font-size: var(--font-size-small);
		color: var(--text-color);
	}

	@media (hover: hover) {
		:global(body[data-theme="purist"]) .menu-toggle:hover {
			text-decoration-thickness: 1.5px;
			background: transparent;
			color: var(--text-color);
		}
	}

	:global(body[data-theme="purist"]) .utility-section {
		padding-bottom: var(--space-md);
		border-bottom: 1px solid #ddd;
	}

	:global(body[data-theme="purist"]) .article-item {
		padding: 0;
		margin-bottom: var(--space-lg);
		display: block;
	}

	:global(body[data-theme="purist"]) .article-item:hover {
		opacity: 0.7;
	}

	/* ========================================
	   LEGACY LAYOUTS (Modern/Brutalist)
	   ======================================== */

	.container {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		gap: var(--space-xl);
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.content {
		width: 100%;
	}

	.project-items-container {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		width: 100%;
	}

	.project-item {
		display: block;
		padding: var(--space-md);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-color);
		transition: all 0.2s ease;
		position: relative;
	}

	.project-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: var(--space-xs);
		height: 100%;
		background: var(--accent-color);
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.project-item:hover::before {
		opacity: 1;
	}

	.project-item:hover {
		transform: translate(-4px, -4px);
		box-shadow: 6px 6px 0 var(--border-color);
	}

	/* Brutalist gets more extreme */
	:global(body[data-theme="brutalist"]) .project-item:hover {
		transform: translate(-8px, -8px);
		box-shadow: 12px 12px 0 var(--border-color);
	}

	.project-item-name {
		font-family: var(--font-display);
		font-size: inherit;
		text-transform: none;
		line-height: inherit;
		font-weight: 700;
		letter-spacing: normal;
	}

	/* NYT/Purist project titles - inline with text */
	:global(body[data-theme="purist"]) .project-item-name {
		font-family: var(--font-body);
		font-size: inherit;
		text-transform: none;
		line-height: inherit;
		font-weight: 700;
		letter-spacing: normal;
	}

	:global(body[data-theme="purist"]) .article-paragraph {
		text-align: justify;
	}

	/* Category descriptions */
	.category-description {
		margin-top: var(--space-xs);
		font-family: var(--font-body);
		font-size: var(--font-size-small);
		line-height: var(--line-height-body);
		color: #666;
	}

	.category-phrase {
		font-style: normal;
	}

	/* NYT/Purist - newspaper caption style */
	:global(body[data-theme="purist"]) .category-description {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		color: var(--text-color);
		margin-top: 0;
	}

	:global(body[data-theme="purist"]) .category-phrase {
		font-style: normal;
	}

	/* Legacy category styling for other themes */
	.categories {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
		margin-top: var(--space-sm);
	}

	.empty-state {
		padding: var(--space-xl);
		border: var(--border-width) solid var(--border-color);
		text-align: center;
	}

	.empty-state button {
		margin-top: var(--space-md);
		padding: var(--space-sm) var(--space-md);
	}

	/* NYT/Purist - clean empty state */
	:global(body[data-theme="purist"]) .empty-state {
		border: none;
		padding: var(--space-lg) 0;
		text-align: left;
	}

	:global(body[data-theme="purist"]) .empty-state button {
		margin-top: var(--space-sm);
		padding: 0;
	}

	@media (min-width: 768px) {
		.container {
			flex-direction: row;
			gap: var(--space-xl);
		}

		.header-search-wrapper {
			flex: 0 0 400px;
			position: sticky;
			top: var(--space-md);
			align-self: flex-start;
		}

		.content {
			flex: 1;
		}

		.project-items-container {
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			gap: var(--space-lg);
		}

		.project-item-name {
			font-size: clamp(1.25rem, 2vw, 1.75rem);
		}

		/* NYT/Purist - single column article list */
		:global(body[data-theme="purist"]) .container {
			flex-direction: column;
			max-width: 720px;
			margin: 0 auto;
		}

		:global(body[data-theme="purist"]) .header-search-wrapper {
			position: static;
			flex: none;
			max-width: 100%;
		}

		:global(body[data-theme="purist"]) .project-items-container {
			grid-template-columns: 1fr;
			gap: 0;
		}
	}

	@media (min-width: 1200px) {
		.project-items-container {
			grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		}

		:global(body[data-theme="purist"]) .project-items-container {
			grid-template-columns: 1fr;
		}
	}

	/* Mobile - single column */
	@media (max-width: 767px) {
		:global(body[data-theme="purist"]) .newspaper-columns {
			column-count: 1;
			column-rule: none;
		}

		:global(body[data-theme="purist"]) .masthead {
			border-bottom-width: 1px;
			margin-bottom: var(--space-md);
		}

		:global(body[data-theme="purist"]) .menu-toggle-section {
			margin-bottom: 8px;
		}

		:global(body[data-theme="purist"]) .utility-section {
			margin-bottom: var(--space-sm);
			gap: 8px;
		}

		:global(body[data-theme="purist"]) .menu-toggle {
			font-size: var(--font-size-caption);
		}

		:global(body[data-theme="purist"]) .article-item {
			margin-bottom: var(--space-md);
		}
	}

	/* Tablet - two columns */
	@media (min-width: 768px) and (max-width: 1023px) {
		:global(body[data-theme="purist"]) .newspaper-columns {
			column-count: 2;
			column-gap: 30px;
		}
	}
</style>
