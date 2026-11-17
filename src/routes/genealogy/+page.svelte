<script>
	import { onMount, tick } from 'svelte';
	import Seo from '$lib/components/seo.svelte';
	import GenealogyGraph from '$lib/components/genealogy-graph.svelte';
	import { defaultMap } from '$lib/genealogy';

	/** @typedef {import('$lib/genealogy').GenealogyMap} GenealogyMap */

	const STORE = 'genealogy-map-v1';
	const fresh = () => /** @type {GenealogyMap} */ (JSON.parse(JSON.stringify(defaultMap)));

	let map = $state(fresh());
	let loaded = $state(false);
	let editing = $state(false);
	let connecting = $state(false);
	let copied = $state(false);
	/** @type {string | null} */
	let selected = $state(null);
	/** @type {HTMLInputElement | null} */
	let nameInput = $state(null);

	const node = $derived(
		map.nodes.find((n) => n.id === selected) ??
			(map.around && map.around.id === selected ? map.around : null)
	);
	// the bubble drawn around the others is in everything, so it has no connections
	const isAround = $derived(!!node && node.id === map.around?.id);
	const connected = $derived(
		selected
			? map.links
					.filter(([a, b]) => a === selected || b === selected)
					.map(([a, b]) => map.nodes.find((n) => n.id === (a === selected ? b : a)))
					.filter((n) => !!n)
			: []
	);

	// Edits are kept in this browser until you copy them out.
	onMount(() => {
		try {
			const saved = JSON.parse(localStorage.getItem(STORE) ?? 'null');
			if (saved && Array.isArray(saved.nodes) && Array.isArray(saved.links)) {
				// a map saved before the surrounding bubble existed gets it from the starting map
				if (saved.around === undefined) saved.around = fresh().around ?? null;
				map = saved;
			}
		} catch (e) {
			// unreadable or blocked storage: start from the default map
		}
		loaded = true;
	});

	$effect(() => {
		const json = JSON.stringify(map);
		if (!loaded) return;
		try {
			localStorage.setItem(STORE, json);
		} catch (e) {
			// storage full or blocked: the map still works for this visit
		}
	});

	/** @param {string | null} id */
	function pick(id) {
		if (connecting && selected && id && id !== selected) {
			if (id !== map.around?.id) toggleLink(selected, id);
			return;
		}
		connecting = false;
		selected = id === selected ? null : id;
	}

	/** @param {string} a @param {string} b */
	function toggleLink(a, b) {
		const at = map.links.findIndex(([x, y]) => (x === a && y === b) || (x === b && y === a));
		if (at >= 0) map.links.splice(at, 1);
		else map.links.push([a, b]);
	}

	/** @param {number} [x] @param {number} [y] */
	async function addBubble(x = 0.5, y = 0.5) {
		const id = 'n' + Date.now().toString(36);
		map.nodes.push({ id, label: 'New bubble', text: '', refs: [], pos: [x, y] });
		connecting = false;
		selected = id;
		await tick();
		nameInput?.focus();
		nameInput?.select();
	}

	function removeBubble() {
		if (!node || !confirm(`Delete "${node.label}"?`)) return;
		const id = node.id;
		if (isAround) map.around = null;
		map.links = map.links.filter(([a, b]) => a !== id && b !== id);
		map.nodes = map.nodes.filter((n) => n.id !== id);
		selected = null;
		connecting = false;
	}

	/** @param {string} id @param {number} x @param {number} y */
	function move(id, x, y) {
		const moved = map.nodes.find((n) => n.id === id);
		if (moved) moved.pos = [x, y];
	}

	function releaseLayout() {
		for (const n of map.nodes) delete n.pos;
	}

	function addRef() {
		if (!node) return;
		node.refs = [...(node.refs ?? []), { label: '', url: '' }];
	}

	async function copyData() {
		await navigator.clipboard.writeText(JSON.stringify(map, null, '\t'));
		copied = true;
		setTimeout(() => (copied = false), 1600);
	}

	function reset() {
		if (!confirm('Throw away your edits and go back to the starting map?')) return;
		map = fresh();
		selected = null;
		connecting = false;
	}

	function done() {
		editing = false;
		connecting = false;
	}

	/** @param {KeyboardEvent} event */
	function onKey(event) {
		if (event.key !== 'Escape') return;
		if (connecting) connecting = false;
		else selected = null;
	}
</script>

<svelte:window onkeydown={onKey} />

<Seo title="Genealogy - Ariel Klevecz" description="A genealogy map of a creative practice." />
<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="genealogy-page" class:open={node}>
	<header>
		<h1>Genealogy</h1>
		<nav>
			{#if editing}
				<button onclick={() => addBubble()}>Add bubble</button>
				<button onclick={releaseLayout}>Loosen layout</button>
				<button onclick={copyData}>{copied ? 'Copied' : 'Copy data'}</button>
				<button onclick={reset}>Reset</button>
				<button onclick={done}>Done</button>
			{:else}
				<button onclick={() => (editing = true)}>Edit</button>
			{/if}
		</nav>
	</header>

	<div class="canvas">
		<GenealogyGraph
			nodes={map.nodes}
			links={map.links}
			around={map.around ?? null}
			{selected}
			{editing}
			onpick={pick}
			onmove={move}
			onadd={addBubble}
		/>
		{#if connecting}
			<p class="status">Click a bubble to connect or disconnect it. Esc to finish.</p>
		{/if}
	</div>

	{#if node}
		<aside class="panel">
			<button class="close" onclick={() => pick(null)} aria-label="Close">Close</button>

			{#if editing}
				<label>
					<span>Name</span>
					<input bind:this={nameInput} bind:value={node.label} />
				</label>

				<label>
					<span>Content</span>
					<textarea rows="8" bind:value={node.text}></textarea>
				</label>

				<div class="field">
					<span>References</span>
					{#each node.refs ?? [] as ref, i}
						<div class="ref-row">
							<input placeholder="Book, record, person, show…" bind:value={ref.label} />
							<input placeholder="Link (optional)" bind:value={ref.url} />
							<button onclick={() => node.refs?.splice(i, 1)} aria-label="Remove reference">
								Remove
							</button>
						</div>
					{/each}
					<button onclick={addRef}>Add reference</button>
				</div>

				{#if !isAround}
					<div class="field">
						<span>Connected to</span>
						{#each connected as other (other.id)}
							<div class="link-row">
								{other.label}
								<button onclick={() => toggleLink(node.id, other.id)}>Remove</button>
							</div>
						{/each}
						<button onclick={() => (connecting = !connecting)}>
							{connecting ? 'Finish connecting' : 'Connect to…'}
						</button>
					</div>
				{/if}

				<button class="delete" onclick={removeBubble}>Delete bubble</button>
			{:else}
				<h2>{node.label}</h2>
				{#if node.text}
					<p class="text">{node.text}</p>
				{/if}
				{#if node.refs?.some((ref) => ref.label || ref.url)}
					<h3>References</h3>
					<ul>
						{#each node.refs.filter((ref) => ref.label || ref.url) as ref}
							<li>
								{#if ref.url}
									<a href={ref.url} target="_blank" rel="noopener">{ref.label || ref.url}</a>
								{:else}
									{ref.label}
								{/if}
							</li>
						{/each}
					</ul>
				{/if}
			{/if}
		</aside>
	{/if}
</div>

<style>
	/* This page is always black on white, whatever the site's mode. */
	.genealogy-page {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		grid-template-rows: auto minmax(0, 1fr);
		height: 100vh;
		height: 100dvh;
		background: #fff;
		color: #000;
		font-size: 13px;
		line-height: 1.5;
		/* underlines are one long hand-drawn line; each button shows a different stretch of it */
		--underline: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='6'%3E%3Cpath d='M0 3.2C9 2.4 17 3.9 28 3.3S47 2.3 58 3S74 4.1 86 3.4S108 2.5 121 3.1S139 3.9 152 3.2S171 2.2 183 2.9S204 3.8 216 3.5S233 2.6 247 3S266 4 279 3.3S301 2.4 312 3.1S331 3.7 344 3.4S366 2.5 378 2.9S392 3.6 400 3.2' fill='none' stroke='%23000' stroke-width='1' stroke-linecap='round'/%3E%3C/svg%3E");
		--underline-heavy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='6'%3E%3Cpath d='M0 3.2C9 2.4 17 3.9 28 3.3S47 2.3 58 3S74 4.1 86 3.4S108 2.5 121 3.1S139 3.9 152 3.2S171 2.2 183 2.9S204 3.8 216 3.5S233 2.6 247 3S266 4 279 3.3S301 2.4 312 3.1S331 3.7 344 3.4S366 2.5 378 2.9S392 3.6 400 3.2' fill='none' stroke='%23000' stroke-width='1.9' stroke-linecap='round'/%3E%3C/svg%3E");
	}

	.genealogy-page.open {
		grid-template-columns: minmax(0, 1fr) 340px;
	}

	:global(body:has(.genealogy-page) .mode-toggle) {
		display: none;
	}

	header {
		grid-column: 1 / -1;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 16px;
		padding: 16px 24px 0;
	}

	.genealogy-page h1,
	.genealogy-page h2,
	.genealogy-page h3 {
		margin: 0;
		font-family: var(--font-body);
		font-weight: 400;
		letter-spacing: 0;
		text-transform: none;
		line-height: 1.5;
	}

	h1 {
		font-size: 13px;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 4px 18px;
	}

	.genealogy-page button,
	.genealogy-page button:hover {
		appearance: none;
		border: 0;
		padding: 0;
		background: none;
		color: #000;
		font: inherit;
		font-weight: 400;
		letter-spacing: 0;
		text-transform: none;
		text-decoration: none;
		padding-bottom: 2px;
		background: var(--underline) 0 100% repeat-x;
		cursor: pointer;
	}

	.genealogy-page button:hover,
	.genealogy-page a:hover {
		background-image: var(--underline-heavy);
	}

	.genealogy-page button:nth-of-type(2),
	.ref-row:nth-child(even) button,
	.link-row:nth-child(even) button {
		background-position-x: -83px;
	}

	.genealogy-page button:nth-of-type(3) {
		background-position-x: -171px;
	}

	.genealogy-page button:nth-of-type(4) {
		background-position-x: -247px;
	}

	.genealogy-page button:nth-of-type(5),
	li:nth-child(even) a {
		background-position-x: -318px;
	}

	.genealogy-page button:focus-visible,
	.genealogy-page a:focus-visible {
		outline: 1px solid #000;
		outline-offset: 3px;
	}

	.canvas {
		position: relative;
		min-width: 0;
		min-height: 0;
	}

	.status {
		position: absolute;
		left: 24px;
		bottom: 16px;
		margin: 0;
		padding: 2px 6px;
		background: #000;
		color: #fff;
	}

	/* ---------- side panel ---------- */
	.panel {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 16px 24px 24px;
		border-left: 0.75px solid #000;
		overflow-y: auto;
		min-height: 0;
	}

	.genealogy-page .close {
		align-self: flex-end;
	}

	h2 {
		font-size: 22px;
		line-height: 1.2;
	}

	.text {
		margin: 0;
		font-size: 15px;
		white-space: pre-wrap;
	}

	h3,
	label span,
	.field > span {
		display: block;
		font-size: 12px;
		color: #767676;
		margin-bottom: 4px;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		margin-top: 4px;
	}

	.genealogy-page a {
		color: #000;
		text-decoration: none;
		padding-bottom: 2px;
		background: var(--underline) -129px 100% repeat-x;
	}

	label,
	.field {
		display: block;
	}

	input,
	textarea {
		display: block;
		width: 100%;
		border: 0.75px solid #000;
		border-radius: 0;
		padding: 7px 8px;
		background: #fff;
		color: #000;
		font: inherit;
		/* 16px keeps phones from zooming in on focus */
		font-size: 16px;
	}

	textarea {
		resize: vertical;
	}

	input:focus,
	textarea:focus {
		outline: 1px solid #000;
	}

	.ref-row {
		display: grid;
		gap: 4px;
		margin-bottom: 12px;
		justify-items: start;
	}

	.link-row {
		display: flex;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 4px;
	}

	.genealogy-page .delete {
		align-self: flex-start;
		margin-top: 8px;
	}

	@media (max-width: 760px) {
		header {
			padding: 12px 16px 0;
		}

		.genealogy-page.open {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto minmax(0, 1fr) minmax(0, 46%);
		}

		.panel {
			border-left: 0;
			border-top: 0.75px solid #000;
			padding: 12px 16px 20px;
		}

		.status {
			left: 16px;
		}
	}
</style>
