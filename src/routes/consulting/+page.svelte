<script>
	import Header from '$lib/components/header.svelte';

	const seo = {
		title: 'AI Consulting - Ariel Klevecz',
		description: 'Expert AI consulting services: ComfyUI workflows, LoRA training, AI integration, and intelligent automation',
		keywords: 'ai consulting, comfyui, lora training, stable diffusion, ai integration, automation',
		author: 'Ariel Klevecz'
	};
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<meta name="keywords" content={seo.keywords} />
	<meta name="author" content={seo.author} />
</svelte:head>

<div class="consulting-page">
	<div class="masthead">
		<Header />
	</div>

	<article class="consulting-article">
		<h1 class="article-title">AI Consulting & Development</h1>

		<div class="article-intro">
			<p><strong>Building intelligent systems that actually work.</strong> Whether you're looking to generate thousands of unique images, automate complex workflows, or integrate AI capabilities into your product, I combine deep technical expertise with a practical understanding of what it takes to ship.</p>
		</div>

		<section class="service-section">
			<h2 class="section-heading">Custom Image & Video Pipelines</h2>
			<p>Expert in ComfyUI for building sophisticated generative workflows. I design and implement custom pipelines for image and video generation tailored to your specific needs—from batch processing thousands of variations to real-time interactive systems. Whether you need ControlNet-based compositions, multi-model orchestration, or specialized post-processing chains, I can architect solutions that scale.</p>
		</section>

		<section class="service-section">
			<h2 class="section-heading">LoRA Training & Fine-tuning</h2>
			<p>Specialized training of LoRA models for consistent style reproduction and character generation. I handle the full pipeline from dataset curation and preparation through training, testing, and optimization. Whether you need a model that captures your brand's visual identity, generates specific characters across different scenarios, or maintains stylistic consistency at scale, I can deliver production-ready models.</p>
		</section>

		<section class="service-section">
			<h2 class="section-heading">AI Application Development</h2>
			<p>Full-stack development of applications that integrate AI capabilities. I build complete systems that combine generative models with user-friendly interfaces, real-time processing, and robust backends. From web applications that let users interact with AI models to mobile apps with on-device or cloud-based inference, I handle the entire stack—model deployment, API design, frontend development, and infrastructure.</p>
		</section>

		<section class="service-section">
			<h2 class="section-heading">Intelligent Automation & Agents</h2>
			<p>Development of AI agents that automate specific tasks and workflows. I create systems that use language models, computer vision, and custom logic to handle repetitive processes, make intelligent decisions, and integrate with existing tools. Whether you need content generation pipelines, automated quality control, or adaptive systems that learn from user interactions, I design agents that fit seamlessly into your operations.</p>
		</section>

		<section class="service-section">
			<h2 class="section-heading">Selected Experience</h2>
			<p><strong>Tool of North America</strong> — AI Pipeline Developer developing custom AI workflows and pipelines for content production, automating content generation with quality controls, and creating visual outputs for client pitches. <strong>yaytso</strong> — Founder creating interactive experiences with digital art. <strong>Good Neighbor</strong> — Digital Warlock building interactive AR experiences. <strong>HIFI Labs</strong> — Fullstack Engineer maintaining and building features for MusicOS social music platform, leading R&D on Web3 and AI integration. <strong>Artifactor</strong> — Bootstrapped MVP and pitched to VCs with interactive demos.</p>
		</section>

		<section class="expertise-section">
			<h2 class="section-heading">Education & Credentials</h2>
			<p>Master's degree in Applied Cognitive Psychology from Claremont Graduate University. Stanford certifications in Deep Generative Models (XCS236) and Natural Language Processing with Deep Learning (XCS224N). Published research in Nature Biotechnology on decentralized investor communities in biotech and genomic data management systems.</p>
		</section>

		<section class="expertise-section">
			<h2 class="section-heading">Technical Foundation</h2>
			<p>I have a comprehensive understanding of modern AI systems—from the mathematical foundations of diffusion models and transformer architectures to the practical realities of inference optimization, prompt engineering, and production deployment. This isn't theoretical knowledge: it's built from hands-on experience shipping real products, training custom models, and solving the messy problems that arise when AI meets production environments.</p>
		</section>

		<section class="cta-section">
			<p class="cta-text">Interested in working together? Get in touch using the contact button above to discuss your project.</p>
		</section>
	</article>
</div>

<style>
	.consulting-page {
		max-width: 900px;
		margin: 0 auto;
		padding: var(--space-lg);
	}

	.masthead {
		margin-bottom: var(--space-xl);
		padding-bottom: var(--space-md);
		border-bottom: 2px solid #000;
	}

	:global(body[data-theme="purist"]) .masthead {
		border-bottom: 2px solid #000;
	}

	.consulting-article {
		font-family: var(--font-body);
		line-height: var(--line-height-body);
	}

	.article-title {
		font-family: var(--font-display);
		font-size: clamp(32px, 6vw, 56px);
		font-weight: 700;
		line-height: var(--line-height-tight);
		margin: 0 0 var(--space-lg) 0;
		letter-spacing: -0.01em;
	}

	.article-intro {
		font-size: clamp(18px, 2.5vw, 22px);
		line-height: 1.6;
		margin-bottom: var(--space-xl);
		padding-bottom: var(--space-lg);
		border-bottom: 1px solid #ddd;
	}

	.article-intro p {
		margin: 0;
	}

	.service-section {
		margin-bottom: var(--space-xl);
	}

	.section-heading {
		font-family: var(--font-body);
		font-size: clamp(20px, 3vw, 26px);
		font-weight: 700;
		line-height: 1.3;
		margin: 0 0 var(--space-sm) 0;
		letter-spacing: -0.01em;
	}

	.service-section p {
		margin: 0;
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		text-align: justify;
	}

	.expertise-section {
		margin-bottom: var(--space-xl);
		padding: var(--space-lg);
		background: #f9f9f9;
		border-left: 4px solid #000;
	}

	.expertise-section p {
		margin: 0;
		font-size: var(--font-size-body);
		line-height: var(--line-height-body);
		text-align: justify;
	}

	.cta-section {
		margin-top: var(--space-xl);
		padding-top: var(--space-lg);
		border-top: 1px solid #ddd;
	}

	.cta-text {
		margin: 0;
		font-size: clamp(16px, 2.5vw, 20px);
		font-weight: 500;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.consulting-page {
			padding: var(--space-md);
		}

		.article-title {
			font-size: clamp(28px, 8vw, 40px);
		}

		.article-intro {
			font-size: var(--font-size-body);
		}

		.service-section p,
		.expertise-section p {
			text-align: left;
		}

		.expertise-section {
			padding: var(--space-md);
		}
	}
</style>
