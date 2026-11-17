<script>
	import { onMount, untrack } from 'svelte';

	/**
	 * @typedef {import('$lib/genealogy').Bubble} Bubble
	 * @typedef {{ x: number, y: number, vx: number, vy: number, held: boolean }} Body
	 */

	/**
	 * @type {{
	 *   nodes: Bubble[],
	 *   links: [string, string][],
	 *   around?: Bubble | null,
	 *   selected?: string | null,
	 *   editing?: boolean,
	 *   onpick?: (id: string | null) => void,
	 *   onmove?: (id: string, x: number, y: number) => void,
	 *   onadd?: (x: number, y: number) => void
	 * }}
	 */
	let {
		nodes,
		links,
		around = null,
		selected = null,
		editing = false,
		onpick = () => {},
		onmove = () => {},
		onadd = () => {}
	} = $props();

	/** @type {HTMLDivElement | null} */
	let box = $state(null);
	let W = $state(0);
	let H = $state(0);
	let tick = $state(0);
	/** @type {string | null} */
	let hover = $state(null);
	/** @type {string | null} */
	let dragId = $state(null);

	const LINE = 14.5;
	const CHAR = 6.4;

	/** Wrap a label so it sits roughly square inside its bubble. @param {string} label */
	function shape(label) {
		const words = (label || 'Untitled').trim().split(/\s+/);
		const max = Math.max(9, Math.ceil(Math.sqrt(label.length * 2.5)));
		/** @type {string[]} */
		const lines = [];
		for (const word of words) {
			const last = lines[lines.length - 1];
			if (last !== undefined && (last + ' ' + word).length <= max)
				lines[lines.length - 1] += ' ' + word;
			else lines.push(word);
		}
		const widest = Math.max(...lines.map((line) => line.length)) * CHAR;
		const r = Math.max(30, Math.hypot(widest / 2, (lines.length * LINE) / 2) + 9);
		return { lines, r };
	}

	// Positions live outside Svelte's reactivity; `tick` tells the template to redraw.
	/** @type {Map<string, Body>} */
	const bodies = new Map();

	const shapes = $derived(new Map(nodes.map((n) => [n.id, shape(n.label)])));

	// The surrounding bubble: a circle in the middle of the frame that the others stay inside.
	// It fills the frame's short side, and grows past it when the bubbles need more room.
	const ring = $derived.by(() => {
		if (!around || !W) return null;
		let room = 0;
		for (const s of shapes.values()) room += Math.PI * (s.r + 14) ** 2;
		room /= 0.55;
		const half = Math.min(W, H) / 2;
		const fit = half - 14;
		// the part of a circle of this radius that the frame's short side leaves in view
		const inFrame = (/** @type {number} */ r) =>
			r <= half
				? Math.PI * r * r
				: 2 * (half * Math.sqrt(r * r - half * half) + r * r * Math.asin(half / r));
		let r = fit;
		let far = Math.max(fit, Math.max(W, H) / 2 - 14);
		if (inFrame(fit) < room) {
			for (let i = 0; i < 20; i++) {
				const mid = (r + far) / 2;
				if (inFrame(mid) < room) r = mid;
				else far = mid;
			}
			r = far;
		}
		return { x: W / 2, y: H / 2, r, whole: r <= fit };
	});

	const unit = $derived(
		Math.max(
			110,
			Math.min(
				230,
				Math.sqrt(
					Math.min(W * H, ring ? Math.PI * ring.r * ring.r : Infinity) / Math.max(nodes.length, 6)
				)
			)
		)
	);

	/** Keep a bubble inside the frame, and inside the surrounding bubble. @param {Body} b @param {number} r */
	function keep(b, r) {
		b.x = Math.max(r + 4, Math.min(W - r - 4, b.x));
		b.y = Math.max(r + 4, Math.min(H - r - 4, b.y));
		if (!ring) return;
		const dx = b.x - ring.x;
		const dy = b.y - ring.y;
		const d = Math.hypot(dx, dy);
		const max = Math.max(0, ring.r - r - 12);
		if (d <= max) return;
		b.x = ring.x + (dx / (d || 1)) * max;
		b.y = ring.y + (dy / (d || 1)) * max;
	}

	/** Give every bubble a body, and drop bodies whose bubble was deleted. */
	function sync() {
		let s = 11;
		const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647 - 0.5) * 2;
		const ids = new Set(nodes.map((n) => n.id));
		for (const id of bodies.keys()) if (!ids.has(id)) bodies.delete(id);
		for (const n of nodes) {
			const jx = rnd();
			const jy = rnd();
			if (bodies.has(n.id)) continue;
			bodies.set(n.id, {
				x: n.pos ? n.pos[0] * W : W / 2 + jx * W * 0.3,
				y: n.pos ? n.pos[1] * H : H / 2 + jy * H * 0.3,
				vx: 0,
				vy: 0,
				held: false
			});
		}
	}

	function step() {
		const list = nodes.map((n) => ({
			n,
			b: /** @type {Body} */ (bodies.get(n.id)),
			r: shapes.get(n.id)?.r ?? 30
		}));

		for (let i = 0; i < list.length; i++) {
			for (let j = i + 1; j < list.length; j++) {
				const p = list[i];
				const q = list[j];
				const dx = q.b.x - p.b.x || 0.01;
				const dy = q.b.y - p.b.y || 0.01;
				const d = Math.max(Math.hypot(dx, dy), 1);
				// everything pushes everything else away, and bubbles never overlap
				let f = Math.min((unit * unit * 0.5) / (d * d), 4);
				const overlap = p.r + q.r + 18 - d;
				if (overlap > 0) f += overlap * 0.25;
				p.b.vx -= (dx / d) * f;
				p.b.vy -= (dy / d) * f;
				q.b.vx += (dx / d) * f;
				q.b.vy += (dy / d) * f;
			}
		}
		// connections pull together
		for (const [from, to] of links) {
			const p = bodies.get(from);
			const q = bodies.get(to);
			if (!p || !q) continue;
			const dx = q.x - p.x;
			const dy = q.y - p.y;
			const d = Math.max(Math.hypot(dx, dy), 1);
			const rest = (shapes.get(from)?.r ?? 30) + (shapes.get(to)?.r ?? 30) + unit * 0.42;
			const f = ((d - rest) / d) * 0.02;
			p.vx += dx * f;
			p.vy += dy * f;
			q.vx -= dx * f;
			q.vy -= dy * f;
		}
		// a loose pull to the middle, shaped to the frame
		const round = !!ring?.whole;
		const gx = 0.003 * (round ? 1 : Math.max(1, Math.pow(H / W, 1.6)));
		const gy = 0.003 * (round ? 1 : Math.max(1, Math.pow(W / H, 1.6)));
		let energy = 0;
		for (const { n, b, r } of list) {
			if (b.held) {
				b.vx = b.vy = 0;
				continue;
			}
			if (n.pos) {
				// a bubble you placed stays where you put it
				b.vx = b.vy = 0;
				b.x += (n.pos[0] * W - b.x) * 0.3;
				b.y += (n.pos[1] * H - b.y) * 0.3;
				keep(b, r);
				continue;
			}
			b.vx = (b.vx + (W / 2 - b.x) * gx) * 0.78;
			b.vy = (b.vy + (H / 2 - b.y) * gy) * 0.78;
			b.x += b.vx;
			b.y += b.vy;
			keep(b, r);
			energy += Math.abs(b.vx) + Math.abs(b.vy);
		}
		return energy;
	}

	onMount(() => {
		const ro = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			if (!width || !height) return;
			const first = !W;
			const oldW = W;
			const oldH = H;
			W = width;
			H = height;
			if (first) {
				sync();
				// settle before the first paint so the map doesn't explode into view
				for (let i = 0; i < 600; i++) step();
			} else {
				for (const b of bodies.values()) {
					b.x *= width / oldW;
					b.y *= height / oldH;
				}
			}
			tick++;
		});
		if (box) ro.observe(box);

		let raf = requestAnimationFrame(function frame() {
			raf = requestAnimationFrame(frame);
			if (!W) return;
			sync();
			if (step() > 0.05 || dragId) tick++;
		});

		return () => {
			ro.disconnect();
			cancelAnimationFrame(raf);
		};
	});

	// redraw when bubbles are added, removed, renamed or reconnected
	$effect(() => {
		nodes.forEach((n) => [n.label, n.pos]);
		links.length;
		untrack(() => {
			if (!W) return;
			sync();
			tick++;
		});
	});

	// ---------- interaction ----------
	/** @type {{ id: string, startX: number, startY: number, offX: number, offY: number, moved: boolean } | null} */
	let press = null;

	/** @param {PointerEvent} event @param {string} id */
	function onPointerDown(event, id) {
		const b = bodies.get(id);
		if (event.button > 0 || !b || !box) return;
		const rect = box.getBoundingClientRect();
		press = {
			id,
			startX: event.clientX,
			startY: event.clientY,
			offX: event.clientX - rect.left - b.x,
			offY: event.clientY - rect.top - b.y,
			moved: false
		};
	}

	/** @param {PointerEvent} event */
	function onPointerMove(event) {
		if (!press || !box) return;
		if (!press.moved && Math.hypot(event.clientX - press.startX, event.clientY - press.startY) < 5)
			return;
		const b = bodies.get(press.id);
		if (!b) return;
		press.moved = true;
		dragId = press.id;
		const rect = box.getBoundingClientRect();
		const r = shapes.get(press.id)?.r ?? 30;
		b.held = true;
		b.x = event.clientX - rect.left - press.offX;
		b.y = event.clientY - rect.top - press.offY;
		keep(b, r);
	}

	function onPointerUp() {
		if (!press) return;
		const b = bodies.get(press.id);
		if (b) b.held = false;
		if (!press.moved) onpick(press.id);
		else if (b) onmove(press.id, b.x / W, b.y / H);
		press = null;
		dragId = null;
	}

	/** @param {KeyboardEvent} event @param {string} id */
	function onKey(event, id) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onpick(id);
		}
	}

	/** @param {MouseEvent} event */
	function onDoubleClick(event) {
		if (!editing || !box) return;
		const rect = box.getBoundingClientRect();
		onadd((event.clientX - rect.left) / W, (event.clientY - rect.top) / H);
	}

	// ---------- what to draw ----------
	// the surrounding bubble holds everything, so focusing it fades nothing
	const focus = $derived.by(() => {
		const id = dragId ?? hover ?? selected;
		return id === around?.id ? null : id;
	});

	// its label sits on the line: at the top, or on the left when the top is out of frame
	const rim = $derived.by(() => {
		if (!ring) return null;
		return ring.y - ring.r >= 8
			? { x: ring.x, y: ring.y - ring.r }
			: { x: ring.x - ring.r, y: ring.y };
	});

	const near = $derived.by(() => {
		const set = new Set();
		if (!focus) return set;
		set.add(focus);
		for (const [a, b] of links) {
			if (a === focus) set.add(b);
			if (b === focus) set.add(a);
		}
		return set;
	});

	const drawnNodes = $derived.by(() => {
		tick;
		return nodes.flatMap((n) => {
			const b = bodies.get(n.id);
			const s = shapes.get(n.id);
			if (!b || !s) return [];
			return [
				{ id: n.id, label: n.label, ...s, x: b.x, y: b.y, dim: focus ? !near.has(n.id) : false }
			];
		});
	});

	const drawnEdges = $derived.by(() => {
		tick;
		return links.flatMap(([from, to]) => {
			const a = bodies.get(from);
			const b = bodies.get(to);
			if (!a || !b) return [];
			return [
				{
					key: `${from}-${to}`,
					x1: a.x,
					y1: a.y,
					x2: b.x,
					y2: b.y,
					dim: focus ? !(from === focus || to === focus) : false
				}
			];
		});
	});
</script>

<div class="graph" class:dragging={dragId} bind:this={box}>
	{#if W}
		<svg
			width={W}
			height={H}
			viewBox="0 0 {W} {H}"
			role="group"
			aria-label="Genealogy map"
			onpointermove={onPointerMove}
			onpointerup={onPointerUp}
			onpointercancel={onPointerUp}
			onpointerleave={onPointerUp}
		>
			<rect
				class="backdrop"
				width={W}
				height={H}
				onclick={() => onpick(null)}
				ondblclick={onDoubleClick}
				role="none"
			/>

			{#if ring && rim && around}
				<g
					class="node around"
					class:selected={selected === around.id}
					role="button"
					tabindex="0"
					aria-label={around.label}
					aria-pressed={selected === around.id}
					onclick={() => onpick(around.id)}
					onkeydown={(event) => onKey(event, around.id)}
				>
					<circle class="reach" cx={ring.x} cy={ring.y} r={ring.r} />
					<circle class="ring" cx={ring.x} cy={ring.y} r={ring.r} />
					<text x={rim.x} y={rim.y + 4}>{around.label || 'Untitled'}</text>
				</g>
			{/if}

			{#each drawnEdges as e (e.key)}
				<line class="edge" class:dim={e.dim} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
			{/each}

			{#each drawnNodes as n (n.id)}
				<g
					class="node"
					class:dim={n.dim}
					class:selected={selected === n.id}
					transform="translate({n.x},{n.y})"
					role="button"
					tabindex="0"
					aria-label={n.label}
					aria-pressed={selected === n.id}
					onpointerdown={(event) => onPointerDown(event, n.id)}
					onpointerenter={() => (hover = n.id)}
					onpointerleave={() => (hover = null)}
					onkeydown={(event) => onKey(event, n.id)}
				>
					<circle class="bubble" r={n.r} />
					<text y={-((n.lines.length - 1) * LINE) / 2 + 4}>
						{#each n.lines as line, i}
							<tspan x="0" dy={i ? LINE : 0}>{line}</tspan>
						{/each}
					</text>
				</g>
			{/each}
		</svg>
	{/if}
</div>

<style>
	.graph {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	svg {
		display: block;
		user-select: none;
		-webkit-user-select: none;
	}

	.backdrop {
		fill: transparent;
	}

	.edge {
		stroke: #000;
		stroke-width: 0.75;
		transition: opacity 0.2s ease;
	}

	.edge.dim {
		opacity: 0.12;
	}

	.node {
		cursor: pointer;
		touch-action: none;
		outline: none;
	}

	.dragging .node {
		cursor: grabbing;
	}

	.bubble {
		fill: #fff;
		stroke: #000;
		stroke-width: 0.75;
		transition: stroke 0.2s ease;
	}

	/* the surrounding bubble: only its line and label take clicks */
	.ring {
		fill: none;
		stroke: #000;
		stroke-width: 0.75;
		pointer-events: none;
	}

	.reach {
		fill: none;
		stroke: transparent;
		stroke-width: 18;
		pointer-events: stroke;
	}

	.around text {
		paint-order: stroke;
		stroke: #fff;
		stroke-width: 10px;
		stroke-linejoin: round;
	}

	text {
		font-family: var(--font-body);
		font-size: 12px;
		font-weight: 400;
		fill: #000;
		text-anchor: middle;
		pointer-events: none;
		transition: fill 0.2s ease;
	}

	.node.selected .bubble,
	.node:focus-visible .bubble,
	.node.selected .ring,
	.node:focus-visible .ring {
		stroke-width: 2;
	}

	/* bubbles stay opaque so lines never show through them; only the ink fades */
	.node.dim .bubble {
		stroke: #d4d4d4;
	}

	.node.dim text {
		fill: #b8b8b8;
	}

	@media (prefers-reduced-motion: reduce) {
		.edge,
		.bubble,
		text {
			transition: none;
		}
	}
</style>
