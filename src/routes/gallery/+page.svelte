<script>
	import projectToImages from '$lib/projectToImages.json';
	import Seo from '$lib/components/seo.svelte';

	/** @param {string} id */
	const humanize = (id) =>
		id
			.split('-')
			.map((/** @type {string} */ w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');

	// One representative image per project, served from static/projects
	let images = Object.entries(projectToImages)
		.filter(([, files]) => files.length > 0)
		.map(([projectId, files], i) => ({
			id: i + 1,
			projectId,
			src: `/projects/${projectId}/${files[0]}`,
			alt: `${humanize(projectId)} project image`,
			title: humanize(projectId)
		}));

	let selectedImage = $state(null);

	function openModal(image) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}


</script>

<Seo title="Gallery - Ariel Klevecz" description="A gallery of images from projects by Ariel Klevecz" />

<div class="gallery-container">
	<h1 class="gallery-title">Gallery</h1>
	
	<div class="masonry-grid">
		{#each images as image (image.id)}
			<div class="masonry-item">
				<img 
					src={image.src} 
					alt={image.alt}
					loading="lazy"
					onclick={() => openModal(image)}
				/>
				<div class="image-overlay">
					<span class="image-title">{image.title}</span>
				</div>
			</div>
		{/each}
	</div>
</div>

{#if selectedImage}
	<div class="modal-overlay" onclick={closeModal}>
		<div class="modal-content" onclick={(e) => e.stopPropagation()}>
			<button class="modal-close" onclick={closeModal}>&times;</button>
			<img src={selectedImage.src} alt={selectedImage.alt} />
			<div class="modal-title">{selectedImage.title}</div>
		</div>
	</div>
{/if}

<style>
	.gallery-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.gallery-title {
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2.5rem;
		color: var(--secondary-color);
	}

	.masonry-grid {
		columns: 1;
		column-gap: 1rem;
		width: 100%;
	}

	.masonry-item {
		display: inline-block;
		width: 100%;
		margin-bottom: 1rem;
		break-inside: avoid;
		position: relative;
		border: 2px solid var(--secondary-color);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		cursor: pointer;
	}

	.masonry-item:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(239, 239, 54, 0.3);
	}

	.masonry-item img {
		width: 100%;
		height: auto;
		display: block;
		transition: opacity 0.3s ease;
	}

	.image-overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: linear-gradient(transparent, rgba(32, 32, 32, 0.9));
		color: var(--secondary-color);
		padding: 1rem;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.masonry-item:hover .image-overlay {
		opacity: 1;
	}

	.image-title {
		font-size: 0.9rem;
		font-weight: bold;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.9);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 2rem;
	}

	.modal-content {
		position: relative;
		max-width: 90vw;
		max-height: 90vh;
		background: var(--primary-color);
		border: 3px solid var(--secondary-color);
		padding: 1rem;
	}

	.modal-content img {
		width: 100%;
		height: auto;
		max-width: 80vw;
		max-height: 70vh;
		object-fit: contain;
	}

	.modal-close {
		position: absolute;
		top: -10px;
		right: -10px;
		background: var(--secondary-color);
		color: var(--primary-color);
		border: none;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		font-size: 1.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.modal-title {
		text-align: center;
		margin-top: 1rem;
		color: var(--secondary-color);
		font-size: 1.1rem;
	}

	@media (min-width: 480px) {
		.masonry-grid {
			columns: 2;
		}
	}

	@media (min-width: 768px) {
		.masonry-grid {
			columns: 3;
		}
	}

	@media (min-width: 1024px) {
		.masonry-grid {
			columns: 4;
		}
	}

	@media (min-width: 1200px) {
		.masonry-grid {
			columns: 5;
		}
	}
</style>