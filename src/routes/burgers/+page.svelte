<script>
	import Seo from '$lib/components/seo.svelte';

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

	function label(name) {
		return name.replace('burger_', '').replaceAll('_', ' ');
	}

	let openIndex = $state(-1);
	let videoEl = $state(null);
	let progress = $state(0);

	const open = $derived(openIndex >= 0);
	const current = $derived(open ? burgers[openIndex] : null);

	function show(i) {
		progress = 0;
		openIndex = i;
	}

	function close() {
		openIndex = -1;
		progress = 0;
	}

	function step(delta) {
		progress = 0;
		openIndex = (openIndex + delta + burgers.length) % burgers.length;
	}

	function onTime() {
		if (!videoEl?.duration) return;
		progress = videoEl.currentTime / videoEl.duration;
	}

	function onKey(e) {
		if (!open) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:window onkeydown={onKey} />

<Seo
	title="Burgers - Ariel Klevecz"
	description="Ten variations on one photograph, each run backwards through a diffusion model into pure noise and played in reverse."
	image="https://klevecz.net/burgers/posters/burger_blooming.jpg"
/>

<div class="page">
	<header class="masthead">
		<a class="back" href="/">← Ariel Klevecz</a>
		<h1>Burgers</h1>
		<p class="thesis">
			Ten variations on a single photograph. Each one was walked <em>backwards</em> through a
			diffusion model until nothing was left but noise — a thousand frames on the way down — then
			played in reverse, so you watch a burger assemble itself out of static.
		</p>
		<dl class="specs">
			<div><dt>Variations</dt><dd>10</dd></div>
			<div><dt>Frames each</dt><dd>1,000</dd></div>
			<div><dt>Model</dt><dd>SD 1.5</dd></div>
			<div><dt>Technique</dt><dd>DDIM inversion</dd></div>
		</dl>
	</header>

	<section class="gallery-section">
		<div class="sec-head">
			<span class="n">01</span>
			<h2>The set</h2>
		</div>
		<p class="lede">
			Every burger below is the same photograph with exactly one thing changed. The name is the only
			hint you get. Click any of them to watch it resolve — it takes about forty seconds.
		</p>

		<ul class="grid">
			{#each burgers as name, i}
				<li>
					<button class="tile" onclick={() => show(i)}>
						<img src="/burgers/posters/{name}.jpg" alt={label(name)} loading="lazy" />
						<span class="tile-meta">
							<span class="tile-name">{label(name)}</span>
							<span class="tile-cue">Play</span>
						</span>
					</button>
				</li>
			{/each}
		</ul>
	</section>

	<section>
		<div class="sec-head">
			<span class="n">02</span>
			<h2>How they were made</h2>
		</div>

		<p class="lede">
			A diffusion model learns to reverse a noising process: training adds Gaussian noise to images
			across a schedule of timesteps, and the network learns to predict what was added. Sampling runs
			that backwards — start from pure noise, repeatedly predict-and-subtract, and an image emerges.
			These videos run it in the other direction, on a picture that already exists.
		</p>

		<ol class="steps">
			<li>
				<h3>Encode into latent space</h3>
				<p>
					The still is normalised to [-1, 1] and pushed through Stable Diffusion 1.5's VAE encoder,
					giving a latent eight times smaller per side. All the arithmetic happens down there, not
					in pixels.
				</p>
			</li>
			<li>
				<h3>Condition on nothing</h3>
				<p>
					An empty prompt is tokenised and encoded once, then reused at every step. There is no
					text guidance anywhere in the run — what you end up watching is the model's own unguided
					read of the picture, not a prompt steering it somewhere.
				</p>
			</li>
			<li>
				<h3>Invert the DDIM update rule</h3>
				<p>
					DDIM is a sampler whose update rule is deterministic — no random draws during sampling —
					and that is the hinge the whole thing turns on: a sampler with no randomness in it can be
					run in reverse. The scheduler's timesteps get flipped into ascending order. At each step
					the UNet predicts the noise in the current latent, the code solves for the implied clean
					latent, then re-noises it forward to the next, noisier level. Repeat 999 times and you
					land on the noise latent that a normal DDIM sampler would have denoised back into this
					exact image.
				</p>
			</li>
			<li>
				<h3>Decode and keep every step</h3>
				<p>
					After each inversion step the latent goes back through the VAE decoder and straight to
					disk as a PNG. Frames are written immediately rather than accumulated, which is the only
					reason a thousand full-resolution frames fit on consumer hardware. Frame zero is the
					untouched original rather than a VAE round-trip, so the sequence resolves to a
					pixel-perfect image.
				</p>
			</li>
			<li>
				<h3>Play it in reverse</h3>
				<p>
					The frames are stored clean → noisy. The videos play them backwards, so a sequence
					authored as a decay is experienced as an emergence. A thousand frames at 24fps: forty-one
					seconds of a burger arriving.
				</p>
			</li>
		</ol>

		<div class="note">
			<span class="eyebrow">The part worth being precise about</span>
			<p>
				This is not noise sprinkled over a picture. Each frame is the model's own latent trajectory,
				decoded — the specific noise <em>this</em> image corresponds to under the distribution the
				model learned. That is why the grain has structure, why it dissolves unevenly, and why the
				burger comes apart along its own seams rather than fading out.
			</p>
		</div>

		<div class="note">
			<span class="eyebrow">The seam</span>
			<p>
				Early versions had a flaw at the very end: the last few frames before the clean image looked
				subtly off. Round-tripping through the VAE leaves its own artifacts, and those don't match an
				untouched original — so the sequence finished on a hard texture pop. The fix measures the
				actual noise level of each frame near the clean end, synthesises a matching version from the
				real photograph, and crossfades between them on a smoothstep curve. Perceptually correct
				rather than only mathematically correct.
			</p>
		</div>
	</section>

	<section class="last">
		<div class="sec-head">
			<span class="n">03</span>
			<h2>Stack</h2>
		</div>
		<div class="tablewrap">
			<table>
				<tbody>
					<tr><th>Inversion</th><td>PyTorch · diffusers · Stable Diffusion 1.5 · DDIMScheduler</td></tr>
					<tr><th>Conditioning</th><td>None — empty prompt, 999 steps</td></tr>
					<tr><th>Frame ops</th><td>NumPy · Pillow</td></tr>
					<tr><th>Output</th><td>1,000 PNGs per run, encoded to 1408×768 mp4</td></tr>
					<tr><th>Hardware</th><td>Apple Silicon (MPS), portable to CUDA. Hours per burger.</td></tr>
				</tbody>
			</table>
		</div>
	</section>
</div>

{#if open}
	<div
		class="lightbox"
		role="dialog"
		aria-modal="true"
		aria-label={label(current)}
		tabindex="-1"
	>
		<button class="scrim" onclick={close} aria-label="Close"></button>

		<div class="stage">
			<!-- svelte-ignore a11y_media_has_caption -->
			{#key current}
				<video
					bind:this={videoEl}
					src="/burgers/{current}.mp4"
					poster="/burgers/posters/{current}.jpg"
					ontimeupdate={onTime}
					autoplay
					muted
					playsinline
				></video>
			{/key}

			<div class="bar" aria-hidden="true">
				<span style="width: {progress * 100}%"></span>
			</div>

			<div class="stage-meta">
				<span class="stage-name">{label(current)}</span>
				<span class="stage-pct">{Math.round(progress * 100)}% resolved</span>
			</div>
		</div>

		<button class="nav prev" onclick={() => step(-1)} aria-label="Previous">←</button>
		<button class="nav next" onclick={() => step(1)} aria-label="Next">→</button>
		<button class="shut" onclick={close} aria-label="Close">Close</button>
	</div>
{/if}

<style>
	.page {
		max-width: 980px;
		margin: 0 auto;
		padding: 0 var(--space-md) var(--space-xl);
	}

	/* ---------- masthead ---------- */
	.masthead {
		padding: var(--space-lg) 0 var(--space-md);
		border-bottom: var(--border-width) solid var(--border-color);
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

	.specs {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1px;
		background: var(--border-color);
		border: var(--border-width) solid var(--border-color);
		margin: var(--space-lg) 0 var(--space-md);
	}

	.specs div {
		background: var(--bg-color);
		padding: var(--space-sm) calc(var(--space-sm) + 2px);
	}

	.specs dt {
		font-size: 10px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		font-weight: 700;
		opacity: 0.6;
		margin-bottom: 4px;
	}

	.specs dd {
		margin: 0;
		font-size: var(--font-size-body);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: -0.01em;
	}

	/* ---------- sections ---------- */
	section {
		padding: var(--space-lg) 0;
		border-bottom: 1px solid var(--border-color);
	}

	section.last {
		border-bottom: 0;
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

	.lede {
		max-width: 40em;
		margin: 0 0 var(--space-md);
		font-size: 17px;
		line-height: 1.5;
	}

	/* ---------- grid ---------- */
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: var(--space-sm);
	}

	.tile {
		display: block;
		width: 100%;
		padding: 0;
		border: 1px solid var(--border-color);
		background: var(--bg-color);
		text-align: left;
		cursor: pointer;
		text-decoration: none;
		transition: border-color 0.15s ease;
	}

	.tile img {
		display: block;
		width: 100%;
		aspect-ratio: 1408 / 768;
		object-fit: cover;
		filter: grayscale(0.15);
		transition: filter 0.25s ease;
	}

	.tile:hover img,
	.tile:focus-visible img {
		filter: grayscale(0);
	}

	.tile:focus-visible {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}

	.tile-meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-sm);
		padding: 10px 12px;
		border-top: 1px solid var(--border-color);
	}

	.tile-name {
		font-size: var(--font-size-caption);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.tile-cue {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		opacity: 0;
		transition: opacity 0.15s ease;
	}

	.tile:hover .tile-cue,
	.tile:focus-visible .tile-cue {
		opacity: 0.6;
	}

	/* ---------- steps ---------- */
	.steps {
		list-style: none;
		margin: 0;
		padding: 0;
		counter-reset: s;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.steps li {
		counter-increment: s;
		display: grid;
		grid-template-columns: 2.4rem 1fr;
		gap: var(--space-sm);
	}

	.steps li::before {
		content: counter(s, decimal-leading-zero);
		font-size: var(--font-size-caption);
		font-weight: 700;
		letter-spacing: 0.06em;
		opacity: 0.45;
		padding-top: 0.35em;
	}

	.steps h3,
	.steps p {
		grid-column: 2;
	}

	.steps h3 {
		font-size: 17px;
		letter-spacing: 0.02em;
		margin-bottom: 6px;
	}

	.steps p {
		margin: 0;
		max-width: 60ch;
		line-height: 1.55;
	}

	/* ---------- notes ---------- */
	.note {
		border-left: 4px solid var(--accent-color);
		padding: var(--space-sm) 0 var(--space-sm) var(--space-sm);
		margin-top: var(--space-lg);
		max-width: 62ch;
	}

	.note .eyebrow {
		display: block;
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.16em;
		opacity: 0.6;
		margin-bottom: 8px;
	}

	.note p {
		margin: 0;
		line-height: 1.55;
	}

	/* ---------- table ---------- */
	.tablewrap {
		overflow-x: auto;
		border: 1px solid var(--border-color);
	}

	table {
		border-collapse: collapse;
		width: 100%;
		min-width: 440px;
	}

	th,
	td {
		text-align: left;
		padding: 12px 14px;
		border-bottom: 1px solid var(--border-color);
		vertical-align: top;
		font-size: var(--font-size-small);
	}

	tr:last-child th,
	tr:last-child td {
		border-bottom: 0;
	}

	th {
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 700;
		white-space: nowrap;
		width: 1%;
		opacity: 0.6;
	}

	/* ---------- lightbox ---------- */
	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-md);
	}

	.scrim {
		position: absolute;
		inset: 0;
		border: 0;
		padding: 0;
		background: var(--bg-color);
		opacity: 0.97;
		cursor: pointer;
	}

	.stage {
		position: relative;
		width: min(100%, 1100px);
	}

	.stage video {
		display: block;
		width: 100%;
		aspect-ratio: 1408 / 768;
		max-height: 78vh;
		object-fit: contain;
		background: var(--text-color);
	}

	.bar {
		height: 3px;
		background: var(--border-color);
		opacity: 0.35;
	}

	.bar span {
		display: block;
		height: 100%;
		background: var(--accent-color);
		opacity: 1;
	}

	.stage-meta {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-sm);
		padding-top: 10px;
	}

	.stage-name,
	.stage-pct {
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 700;
	}

	.stage-pct {
		opacity: 0.55;
		font-variant-numeric: tabular-nums;
	}

	.nav,
	.shut {
		position: absolute;
		font-size: var(--font-size-caption);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 700;
		padding: 10px;
	}

	.prev {
		left: 8px;
		top: 50%;
		transform: translateY(-50%);
	}

	.next {
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
	}

	.shut {
		top: 10px;
		right: 12px;
	}

	@media (max-width: 640px) {
		.steps li {
			grid-template-columns: 1.8rem 1fr;
		}

		.nav {
			top: auto;
			bottom: 10px;
			transform: none;
		}
	}
</style>
