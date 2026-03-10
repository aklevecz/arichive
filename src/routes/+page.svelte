<script>
	import { onMount } from 'svelte';

	const burgers = [
		'burger_bite_underneath',
		'burger_blooming',
		'burger_cheese_face',
		'burger_cheese_hand',
		'burger_clover',
		'burger_feather',
		'burger_frog_lettuce',
		'burger_hair',
		'burger_hand_shadow',
		'burger_hatching_seeds'
	];

	let current = $state('');
	let videoEl = $state(null);
	let playbackRate = $state(1);

	function pickRandom(exclude) {
		const choices = burgers.filter((b) => b !== exclude);
		return choices[Math.floor(Math.random() * choices.length)];
	}

	function label(name) {
		return name.replace('burger_', '').replaceAll('_', ' ');
	}

	onMount(() => {
		current = pickRandom();
	});

	function handleEnded() {
		if (playbackRate === 1) {
			// boomerang: play in reverse
			playbackRate = -1;
			videoEl.playbackRate = 1;
			videoEl.currentTime = videoEl.duration;
			// use reverse by seeking backwards manually
			boomerang();
		} else {
			// done boomeranging, pick next
			playbackRate = 1;
			current = pickRandom(current);
		}
	}

	function boomerang() {
		const step = () => {
			if (!videoEl) return;
			videoEl.currentTime -= 1 / 30;
			if (videoEl.currentTime <= 0) {
				videoEl.currentTime = 0;
				playbackRate = 1;
				current = pickRandom(current);
				return;
			}
			requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	}

	// When current changes, play the new video
	$effect(() => {
		if (current && videoEl) {
			videoEl.playbackRate = 1;
			videoEl.currentTime = 0;
			videoEl.play();
		}
	});
</script>

<svelte:head>
	<title>burgers</title>
</svelte:head>

<div class="page">
	{#if current}
		{#key current}
			<video
				bind:this={videoEl}
				src="/burgers/{current}.mp4"
				onended={handleEnded}
				autoplay
				muted
				playsinline
			></video>
		{/key}
		<span class="label">{label(current)}</span>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		background: #000;
		color: #fff;
		font-family: monospace;
		overflow: hidden;
	}

	.page {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	video {
		max-width: 100%;
		max-height: 100%;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.label {
		position: absolute;
		bottom: 20px;
		left: 0;
		right: 0;
		text-align: center;
		padding: 8px;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 2px;
		opacity: 0.5;
	}
</style>
