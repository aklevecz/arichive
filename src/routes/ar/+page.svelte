<script>
	import { onMount } from 'svelte';

	import Seo from '$lib/components/seo.svelte';

	const posters = [
		// — Bao's Dreams (bao2.baos.haus) —
		{ src: '/images/bao-2/bao_dad.jpeg', title: "Grandpa's Adventures", titleSvg: '/headings/adventures-header.svg', description: 'Bao and his grandpa hanging out in the lab, and then traversing the world. Some believe they are the same being from different areas with much different smelling farts. ', qr: '/images/qr-bao2.svg', arUrl: 'https://bao2.baos.haus' },
		{ src: '/images/bao-2/bao_scientist.jpeg', title: 'The Scientist', titleSvg: '/headings/scientist-header.svg', description: 'Bao is in the lab attempting to discover profound chicken discoveries. For some time he has been distilling chicken energy into various liquids through highly confidential processes. This time things get particularly weird as the experiment turns on him.', qr: '/images/qr-bao2.svg', arUrl: 'https://bao2.baos.haus' },
		{ src: '/images/bao-2/bao_dj.jpeg', title: 'DJ Bao', titleSvg: '/headings/dj-bao.svg', description: 'Spinning fire and chicken beats in clubs worldwide. In fact it gets so hot that the world tends to melt around him into an uncanny mess. ', qr: '/images/qr-bao2.svg', arUrl: 'https://bao2.baos.haus' },
		{ src: '/images/bao-2/bao_egypt.jpeg', title: 'Anubis', titleSvg: '/headings/anubis.svg', description: 'The ancient farting judger of the dead. Few know that Bao is a time traveller and is the actual Anubis instead of the jackal that people tend to associate with him. The identity was lost in translation due to the Rosetta Stone missing a few glyphs related to farting. The fact that Anubus was also very popular with many queens is also rarely understood.', qr: '/images/qr-bao2.svg', arUrl: 'https://bao2.baos.haus' },
		// — Flowers (ar.yaytso.art) —
		{ src: '/images/flowers-ar/flower-2.jpeg', title: 'Lily II', titleSvg:'/headings/lily-2.svg', description: 'One of the many flowers blooming into ooze and skulls. Take a journey down the rabbit hole and imagine a world where you can discover new found depth in seeminly static images.', qr: '/images/qr-flowers.svg', arUrl: 'https://ar.yaytso.art' },
		{ src: '/images/flowers-ar/flower-9.jpeg', title: 'Lily IX', titleSvg:"/headings/lily-9.svg", description: 'Neon petals curling through deep space. Continue to stare into the void and you will see a psychedelic reflection that you didnt know you were looking for.', qr: '/images/qr-flowers.svg', arUrl: 'https://ar.yaytso.art' },
		// — Gizzard (gizzard.yaytso.art) —
		{ src: '/images/ar-posters/gizzard-lizard_cover_1.jpeg', title: 'King Gizzard Bootleg rPET', titleSvg:'/headings/king-gizz.svg', description: 'A special bootleg curated and produced by Good Neighbor with AR visuals to boot as well. If you keep refreshing you may even see different characters and objects emerge from the cover art. Recommended to try when both tripping and not tripping, but guaranteed to make you feel trippy in either case.', qr: '/images/qr-gizzard.svg', arUrl: 'https://gizzard.yaytso.art' },
		{ src: '/images/ar-posters/gizzard-koolaid.png', title: 'Good Neighbor Spinner', titleSvg: '/headings/gn-spinner.svg', description: 'The cutest Good Neighbor character really showing of his globe abilities. Who knew that even the personified version of earth could rotate on its axis like that. The mytery is what he does with his legs?', qr: '/images/qr-gizzard.svg', arUrl: 'https://gizzard.yaytso.art' },
		{ src: '/images/ar-posters/gizzard-cup_melt.jpeg', title: 'Cup Melt', titleSvg:"/headings/cup-melt.svg", description: 'A magical demonstration of the technology that Good Neighbor brings to the world. A simple cup that we use to consume liquid for our enjoyment, occasionally at music events, being transmuted into the experience it helped enhance, more music.', qr: '/images/qr-gizzard.svg', arUrl: 'https://gizzard.yaytso.art' },
		{ src: '/images/ar-posters/gizzard-lizard_scene.jpeg', title: 'Lizard Box', titleSvg: '/headings/lizard-box.svg', description: 'This entrepid lizard is making his way through Field of Vision festival with some friends. Little do they know that he is shrouded in a psychedelic box that he uses to bring magic wherever he goes.', qr: '/images/qr-gizzard.svg', arUrl: 'https://gizzard.yaytso.art' },
		// — Good Neighbor (gn.yaytso.art) —
		{ src: '/images/ar-posters/gn-record-cover.jpeg', title: 'Ruth', titleSvg:'/headings/ruth.svg', description: 'Ruth going on a trippy adventure', qr: '/images/qr-gn.svg', arUrl: 'https://gn.yaytso.art' },
		{ src: '/images/ar-posters/gn-tobi-cover.jpeg', title: 'Tobi', titleSvg: '/headings/tobi.svg',  description: 'Tobi distinegrating into the noise', qr: '/images/qr-gn.svg', arUrl: 'https://gn.yaytso.art' },
		// — Remi (remi.yaytso.art) —
		{ src: '/images/ar-posters/remi-lambcityoil.jpeg', title: 'Lamb City', titleSvg: '/headings/lamb-city.svg', description: 'Lamb City is a wonderful place where lambs multiply into frogs and shifting shapes. Not for the faint of heart, those brave enough to wander into the green expanse will be rewarded with much wisdom and reverie.', qr: '/images/qr-remi.svg', arUrl: 'https://remi.yaytso.art' },
		// — Park Noggles (park-noggles.yaytso.art) —
		{ src: '/images/ar-posters/noggles-1.jpeg', title: 'Noggles', titleSvg: '/headings/noggles.svg', description: 'Noggles in the clouds', qr: '/images/qr-noggles.svg', arUrl: 'https://park-noggles.yaytso.art' },
		{ src: '/images/ar-posters/noggles-3.jpeg', title: 'Noggles III', titleSvg: '/headings/noggles.svg', description: 'Noggles continued', qr: '/images/qr-noggles.svg', arUrl: 'https://park-noggles.yaytso.art' },
	];

	onMount(() => {
		const sections = document.querySelectorAll('.poster-section');

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const poster = entry.target.querySelector('[data-poster]');
					const meta = entry.target.querySelector('[data-meta]');
					if (entry.isIntersecting) {
						poster?.classList.add('visible');
						meta?.classList.add('visible');
					} else {
						poster?.classList.remove('visible');
						meta?.classList.remove('visible');
					}
				}
			},
			{ threshold: 0.3 }
		);

		for (const s of sections) observer.observe(s);
		return () => observer.disconnect();
	});
</script>

<Seo
	title="AR Posters — Ariel Klevecz"
	description="Scroll to explore. Scan to see them come alive."
	image="https://klevecz.net{posters[0].src}"
/>

<div class="posters-page">
	<!-- intro -->
	<section class="intro">
		<img alt="AR Posters" src="/headings/ar-header.svg" class="ink-svg"/>
		<div class="scroll-hint">
			<img style="width:200px; height:200px;" src="/icons/arrow-down.svg" alt="scroll down" class="arrow ink-svg" />
		</div>
	</section>

	<!-- poster sections -->
	{#each posters as poster, i (i)}
		<section class="poster-section" data-index={i}>
			<div class="poster-scene">
				<!-- poster -->
				<div class="poster-plane" data-poster>
					<div class="poster-front">
						<img src={poster.src} alt={poster.title} loading="lazy" />
					</div>
				</div>

				<!-- info + QR -->
				<div class="poster-meta" data-meta>
					<div class="meta-inner">
						{#if poster.titleSvg}
						<img src={poster.titleSvg} alt={poster.title} class="ink-svg"/>
						{:else}
						<h2>{poster.title}</h2>
						{/if}
						<p>{poster.description}</p>
						<a class="qr-block" href={poster.arUrl} target="_blank" rel="noopener">
							<img src={poster.qr} alt="Scan to open AR" class="qr-code" />
							<!-- <span class="qr-label">Scan with your phone<br />to see it in AR</span> -->
						</a>
					</div>
				</div>
			</div>
		</section>
	{/each}

	<!-- outro -->
	<section class="outro">
		<p>Want to experience it in person?</p>
		<a href="https://yaytso.art/calendar" class="cta">See upcoming events</a>
	</section>
</div>

<style>
	.posters-page {
		position: relative;
		overflow-x: hidden;
	}

	/* hand-drawn ink SVGs are <img>s with #231f20 strokes — invert them in dark mode */
	:global(body[data-mode='dark']) .ink-svg {
		filter: invert(1);
	}

	/* ---- intro ---- */
	.intro {
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 1rem;
	}
	.intro h1 {
		font-family: var(--font-display);
		font-size: var(--font-size-hero);
		letter-spacing: -0.02em;
		margin: 0;
	}
	.intro p {
		font-size: 1.1rem;
		opacity: 0.6;
	}
	.scroll-hint {
		margin-top: 2rem;
	}
	.scroll-hint .arrow {
		display: inline-block;
		width: 64px;
		height: auto;
		animation: bobDown 1.6s ease-in-out infinite;
	}
	@keyframes bobDown {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(12px);
		}
	}

	/* ---- each poster section ---- */
	.poster-section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
	}

	.poster-scene {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5rem;
		max-width: 1200px;
		width: 100%;
	}

	/* ---- poster plane ---- */
	.poster-plane {
		position: relative;
		opacity: 0;
		transform: translateY(40px) scale(0.95);
		transition:
			transform 1.1s cubic-bezier(0.16, 1, 0.3, 1),
			opacity 0.7s ease;
		will-change: transform, opacity;
	}
	.poster-plane:global(.visible) {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.poster-front {
		position: relative;
		overflow: hidden;
		max-width: 520px;
		background: var(--text-color);
		/* border: var(--border-width, 4px) solid var(--border-color, currentColor); */
		box-shadow:
			0 8px 40px rgba(0, 0, 0, 0.5),
			0 2px 12px rgba(0, 0, 0, 0.3);
	}
	.poster-front img {
		display: block;
		width: 100%;
		height: auto;
	}

	/* ---- meta / QR ---- */
	.poster-meta {
		opacity: 0;
		transform: translateX(50px);
		transition:
			transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s,
			opacity 0.6s ease 0.2s;
		will-change: transform, opacity;
		flex: 0 0 300px;
	}
	.poster-meta:global(.visible) {
		opacity: 1;
		transform: translateX(0);
	}

	.meta-inner {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}
	.poster-meta h2 {
		font-family: var(--font-display);
		font-size: 2.2rem;
		letter-spacing: -0.01em;
		margin: 0;
	}
	.poster-meta p {
		font-size: 1rem;
		line-height: 1.1;
		margin: 0;
	}

	.qr-block {
		margin-top: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		background-color: black;
	}
	.qr-block:hover {
		color: inherit;
	}
	.qr-code {
		width: 120px;
		height: 120px;
		/* padding: 8px; */
		/* background: white; */
		filter: invert(1);
		border-radius: 4px;
	}

	/* ---- outro ---- */
	.outro {
		height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		text-align: center;
	}
	.outro p {
		font-family: var(--font-display);
		font-size: 2.4rem;
		letter-spacing: -0.01em;
	}
	.cta {
		border: 2px solid var(--accent-color);
		padding: 0.8rem 2.5rem;
		font-family: var(--font-body);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-size: 1.1rem;
		color: var(--accent-color);
		text-decoration: none;
		transition:
			background 0.25s,
			color 0.25s;
	}
	.cta:hover {
		background: var(--accent-color);
		color: var(--bg-color);
	}

	/* ---- alternating layout ---- */
	.poster-section:nth-child(odd) .poster-scene {
		flex-direction: row;
	}
	.poster-section:nth-child(even) .poster-scene {
		flex-direction: row-reverse;
	}
	.poster-section:nth-child(even) .poster-meta {
		transform: translateX(-50px);
	}
	.poster-section:nth-child(even) .poster-meta:global(.visible) {
		transform: translateX(0);
	}

	/* ---- mobile ---- */
	@media screen and (max-width: 768px) {
		.intro p {
			font-size: 1rem;
		}
		.poster-section {
			min-height: auto;
			padding: 5rem 1rem;
		}
		.poster-scene {
			flex-direction: column !important;
			gap: 2rem;
		}
		.poster-front {
			max-width: 340px;
		}
		.poster-meta {
			flex: unset;
			text-align: center;
			transform: translateY(30px) !important;
		}
		.poster-meta.visible {
			transform: translateY(0) !important;
		}
		.meta-inner {
			align-items: center;
		}
		.qr-block {
			flex-direction: column;
			text-align: center;
		}
		.poster-number {
			font-size: 3rem;
		}
		.poster-meta h2 {
			font-size: 1.8rem;
		}
		.poster-meta p {
			font-size: 0.9rem;
		}
		.qr-code {
			width: 110px;
			height: 110px;
		}
		.qr-label {
			font-size: 0.75rem;
		}
		.outro p {
			font-size: 1.8rem;
		}
	}
</style>
