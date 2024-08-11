<script>
	import projectToImages from '$lib/projectToImages.json';
	import { onMount } from 'svelte';
	/** @type {{data:import('./$types').LayoutData}} */
	let { data } = $props();
	const { project } = data;
	console.log(data);
	/** @type {Record<string, string[]>} */
	let imageMap = projectToImages;
	/** @type {string[]} */
	const images = imageMap[project?.id || 0] ?? [];
	const imagePrefix = `/projects/${project?.id}/`;
	const src = images[0] ? `/projects/${project?.id}/${images[0]}` : '/projects/bao/bao.jpeg';

	let currentFeaturedImageIndex = $state(Math.floor(Math.random() * images.length));
	let fadeClass = $state('fade-in');
	const randomImage = () => {
		fadeClass = 'fade-out';
		setTimeout(() => {
			currentFeaturedImageIndex = Math.floor(Math.random() * images.length);
			fadeClass = 'fade-in';
		}, 500); // Duration of the fade-out effect
	};
	onMount(() => {
		const interval = setInterval(randomImage, 3000);
		return () => clearInterval(interval);
	});

	let currentFeaturedVideoId = $state(2);
	let videoFadeClass = $state('fade-in');
	const nextVideo = () => {
		videoFadeClass = 'fade-out';
		setTimeout(() => {
			currentFeaturedVideoId++;
			videoFadeClass = 'fade-in';
		}, 500); // Duration of the fade-out effect
	};
	onMount(() => {
		const interval = setInterval(nextVideo, 10000);
		return () => clearInterval(interval);
	});

	let firstVideoLoaded = $state(false);
</script>

{#snippet headline(/** @type {{device:'mobile' | 'desktop'}} */ { device })}
	<div class="headline {device}">
		<h3>{project?.name}</h3>

		<!-- <img {src} style="height:75px; margin: 1rem 0;" alt={project?.name} /> -->
	</div>
	<!-- <div style="margin-bottom:1rem;">{project?.description}</div> -->
{/snippet}
{@render headline({ device: 'mobile' })}
<div class="content">
	<div class="website-iframe-container">
		{#if project?.videoConfiguration}<video
				class="featured-image {videoFadeClass}"
				playsinline
				autoplay
				muted
				loop
				src="https://fest-nouns.yaytso.art/{currentFeaturedVideoId}.mp4"
				onloadeddata={() => {
					console.log('LOADINED');
					firstVideoLoaded = true;
				}}
			></video>{/if}
		{#if project?.hasGallery}
			<img
				style=""
				class="featured-image {fadeClass}"
				src={imagePrefix + images[currentFeaturedImageIndex]}
				alt="featured"
			/>
		{/if}
		{#if project?.url && !project?.hasGallery}
			<iframe class="website-iframe" title={`${project?.name} iframe`} src={project?.url} style=""
			></iframe>{/if}
	</div>
	<div class="info-container">
		{@render headline({ device: 'desktop' })}
		{#if project?.url}<div style="margin:1rem 0rem; display:block;">
				<a
					style="margin:auto; display:block;"
					class="btn visit-site"
					href={project?.url}
					target="_blank"
					rel="noopener noreferrer">visit site</a
				>
			</div>
		{/if}
		<div style="margin:1.5rem 0;">{project?.description}</div>
		{#if project?.descriptionLong}
			{#each project?.descriptionLong as paragraph}
				<p>{paragraph}</p>
			{/each}
		{/if}
		<div>
			<div style="display:flex; flex-wrap:wrap; gap:1rem; margin-top:1rem;">
				{#if project}
					{#each project?.categories as category}
						<div class="category-nugget">{category}</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>
{#if project?.hasGallery}
	<div style="margin-top:1rem;">
		{#each images as image}
			<img src={imagePrefix + image} alt={image} style="" class="gallery-image" />
		{/each}
	</div>
{/if}

{#if project?.videoConfiguration && firstVideoLoaded}
	<div style="margin-top:1rem;">
		{#each Array.from({ length: project?.videoConfiguration.maxId }, (_, i) => i + 1) as id}
			<video class="gallery-image" src="https://fest-nouns.yaytso.art/{id}.mp4"></video>
		{/each}
	</div>
{/if}

<style>
	.headline {
		align-items: center;
		justify-content: space-between;
		margin: 1rem 0;
		font-size: 1rem;
	}
	.headline.mobile {
		display: flex;
	}
	.headline.desktop {
		display: none;
	}

	.featured-image {
		width: 300px;
	}
	.content {
		display: flex;
		flex-direction: column;
	}

	.website-iframe {
		width: 100%;
		height: 300px;
		border: none;
	}
	.visit-site {
		width: 150px;
		text-align: center;
	}
	.gallery-image {
		width: 100px;
		height: 100px;
		object-fit: cover;
		margin: 0.25rem;
	}
	.fade-in {
		opacity: 1;
		transition: opacity 0.5s ease-in;
	}

	.fade-out {
		opacity: 0;
		transition: opacity 0.5s ease-out;
	}
	@media (min-width: 1200px) {
		.headline {
			/* margin-left: 1rem; */
			/* margin: 1rem 0; */
		}
		.headline.mobile {
			display: none;
		}
		.headline.desktop {
			display: flex;
		}
		.featured-image {
			width: 500px;
			margin: 2rem auto;
			display: block;
		}
		.content {
			gap: 2rem;
			margin-top: 1rem;
			margin-left: 1rem;
		}

		h3 {
			font-size: 3rem;
		}
		.content {
			flex-direction: row;
		}
		.website-iframe-container {
			margin-top: 1rem;
			flex: 1;
			order: 2;
		}
		.website-iframe {
			height: 75vh;
		}
		.info-container {
			flex: 0 1 33%;
		}
		.gallery-image {
			margin-left: 1rem;
		}
	}
</style>
