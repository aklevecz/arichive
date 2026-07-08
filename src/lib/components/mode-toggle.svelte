<script>
	function toggle() {
		const next = document.body.dataset.mode === 'dark' ? 'light' : 'dark';
		document.body.dataset.mode = next;
		try {
			localStorage.setItem('mode', next);
		} catch (e) {
			// private browsing etc. — mode still applies for this page view
		}
	}
</script>

<button class="mode-toggle" onclick={toggle} aria-label="Toggle light/dark mode">
	<span class="icon icon-moon" aria-hidden="true">&#9789;</span>
	<span class="icon icon-sun" aria-hidden="true">&#9728;</span>
</button>

<style>
	.mode-toggle {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: 100;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid var(--border-color);
		border-radius: 50%;
		background: var(--bg-color);
		color: var(--text-color);
		font-size: 18px;
		line-height: 1;
		padding: 0;
		cursor: pointer;
		text-decoration: none;
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}

	.mode-toggle:hover {
		background: var(--text-color);
		color: var(--bg-color);
		transform: none;
		box-shadow: none;
		text-decoration: none;
	}

	/* icon follows the current mode (set on <body>) */
	.icon-sun {
		display: none;
	}
	:global(body[data-mode='dark']) .mode-toggle .icon-moon {
		display: none;
	}
	:global(body[data-mode='dark']) .mode-toggle .icon-sun {
		display: inline;
	}
</style>
