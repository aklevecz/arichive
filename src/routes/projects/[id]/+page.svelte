<script>
	import projectToImages from '$lib/projectToImages.json';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	/** @type {{data:import('./$types').LayoutData}} */
	let { data } = $props();
	const { project } = data;
	/** @type {Record<string, string[]>} */
	let imageMap = projectToImages;
	/** @type {string[]} */
	const images = imageMap[project?.id || 0] ?? [];
	const imagePrefix = `/projects/${project?.id}/`;
	const src = images[0] ? `/projects/${project?.id}/${images[0]}` : '/projects/bao/bao.jpeg';

	/** @type {number[]} clickedArray */
	let clickedArray = $state([]);

	let currentFeaturedImageIndex = $state(Math.floor(Math.random() * images.length));
	let fadeClass = $state('fade-in');
	const randomImage = () => {
		fadeClass = 'fade-out';
		setTimeout(() => {
			currentFeaturedImageIndex = Math.floor(Math.random() * images.length);
			fadeClass = 'fade-in';
		}, 500); // Duration of the fade-out effect
	};
	/** @type {*} */
	let imageInterval = null;
	onMount(() => {
		imageInterval = setInterval(randomImage, 3000);
		return () => clearInterval(imageInterval);
	});

	$effect(() => {
		if (currentFeaturedImageIndex) {
			clearInterval(imageInterval);
			imageInterval = setInterval(randomImage, 5000);
		}
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

	// fade in iframe
	let iframeFadeClass = $state('fade-out');
	onMount(() => {
		setTimeout(() => {
			iframeFadeClass = 'fade-in';
			document.querySelector('.smiler-wrapper')?.classList.add('fade-out');
		}, 1000);
	});

	let videoUrls = $state(project?.videoUrls);
	let currentVideoUrl = $state(project?.videoUrls ? project.videoUrls[0] : null)
	let featuredVideoElement = $state(null)
	onMount(() => {
		featuredVideoElement.addEventListener('ended', () => {
			const currentIndex = videoUrls.indexOf(currentVideoUrl)
			currentVideoUrl = videoUrls[(currentIndex + 1) % videoUrls.length]
		})
		// currentVideoUrlInterval = setInterval(() => {
		// 	currentVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)]
		// }, 5000)
	})
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
	<!-- <div class="website-iframe-container"> -->
	<div class="featured-media">
		{#if project?.videoUrls?.length}
			<video playsinline bind:this={featuredVideoElement} class="featured-image" src={`/projects/${project?.id}/${currentVideoUrl}`} autoplay muted></video>
		{/if}
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
				style={`${project?.id === 'secret-clothing' ? 'filter: sepia(1)' : ''} ${project?.imgConfiguration ? `width:${project?.imgConfiguration.width}` : ''}`}
				class="featured-image {fadeClass}"
				src={imagePrefix + images[currentFeaturedImageIndex]}
				alt="featured"
			/>
		{/if}
		{#if project?.url && !project?.hasGallery}
			<!-- style="position:absolute;z-index:0;left:250px;top:200px;"><img alt="smiler" style="width:300px;height:300px;" -->
			<div class="website-iframe-container">
				<iframe
					style="background:none;position:absolute;z-index:1;"
					class="website-iframe {iframeFadeClass}"
					title={`${project?.name} iframe`}
					src={project?.url}
				></iframe>
				<div class="smiler-wrapper fade-in">
					<img class="smiler" alt="smiler" src="/animations/smiler-animated.svg" />
				</div>
			</div>
		{/if}
	</div>
	<div class="info-container">
		{@render headline({ device: 'desktop' })}
		{#if project?.url}<div style="margin:1rem 0rem; display:block;">
				<a class="visit-site" href={project?.url} target="_blank" rel="noopener noreferrer"
					>visit site</a
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
			<button
				class="gallery-image-button"
				style="opacity:{!clickedArray.includes(images.indexOf(image))
					? '100%'
					: '33%'};transition:opacity 0.5s;"
				onclick={() => {
					const imageIndex = images.indexOf(image);
					clickedArray.push(imageIndex);
					currentFeaturedImageIndex = imageIndex;
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}}
			>
				<img
					style={project?.id === 'secret-clothing' ? 'filter: sepia(1)' : ''}
					src={imagePrefix + image}
					alt={image}
					class="gallery-image"
				/>
			</button>
		{/each}
	</div>
{/if}

{#if project?.videoConfiguration && firstVideoLoaded}
	<div style="margin-top:1rem;display: flex; flex-wrap: wrap; gap: 1rem;">
		{#each Array.from({ length: project?.videoConfiguration.maxId }, (_, i) => i + 1) as id}
			<!-- <video class="gallery-image" src="https://fest-nouns.yaytso.art/{id}.mp4"></video> -->
			<img
				src={`${project.id}/thumbnails/${id}.webp`}
				alt="video thumbnail"
				class="gallery-image"
			/>
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
		/* width: 300px; */
		width: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
	}

	.website-iframe-container {
		position: relative;
		width: 100%;
		height: 400px;
	}
	.website-iframe {
		width: 100%;
		height: 400px;
		border: none;
	}

	.smiler {
		width: 100%;
		/* height: 100px; */
	}

	.visit-site {
		width: 150px;
		/* text-align: center; */
		text-decoration: underline;
		transition: color 0.5s;
	}
	.visit-site:hover {
		color: rgb(var(--accent-color));
	}
	.gallery-image-button {
		background: none;
		padding: 0;
		margin: 0.25rem;
	}
	.gallery-image {
		width: 100px;
		height: 100px;
		object-fit: cover;
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
			width: 80%;
			/* height: 100%; */
			margin: 2rem auto;
			display: block;
		}
		.content {
			gap: 2rem;
			margin-top: 1rem;
			margin-left: 1rem;
		}

		h3 {
			font-size: 2rem;
		}
		.content {
			flex-direction: row;
		}
		.featured-media {
			flex: 1;
			order: 1;
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
		.gallery-image-button {
			margin-left: 1rem;
		}
	}
</style>
