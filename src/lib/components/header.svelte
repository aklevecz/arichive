<script>
	let contact = $state({ email: '', phone: '' });
	let fetching = $state(false);
	async function fetchContact() {
		fetching = true;
		const res = await fetch('/contact?sliack=meepo');
		const data = await res.json();
		contact = data;
		fetching = false;
	}
</script>

<header class="bauhaus-header">
	<h1 class="name-heading">
		ARIEL<br />
		KLEVECZ
	</h1>
	<div class="subtitle">MAD SCIENTIST</div>

	<div class="button-container">
		<button onclick={fetchContact} class="icon-button">
			<span class="button-label">Contact</span>
		</button>
		<a href="https://github.com/aklevecz" class="icon-button" aria-label="GitHub">
			<svg
				aria-hidden="true"
				viewBox="0 0 24 24"
				version="1.1"
				data-view-component="true"
				fill="currentColor"
			>
				<path
					d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"
				></path>
			</svg>
			<span class="button-label">GH</span>
		</a>
		<a href="https://www.linkedin.com/in/ariel-klevecz/" class="icon-button" aria-label="LinkedIn">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				data-supported-dps="24x24"
				fill="currentColor"
				focusable="false"
			>
				<path
					d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
				></path>
			</svg>
			<span class="button-label">IN</span>
		</a>
	</div>

	{#if fetching}
		<div class="spinner"></div>
	{/if}
	{#if contact.email}
		<div class="contact-info">
			<div>{contact.email}</div>
			<div>{contact.phone}</div>
		</div>
	{/if}
</header>

<style>
	.bauhaus-header {
		border: var(--border-width) solid var(--border-color);
		padding: var(--space-lg);
		position: relative;
	}

	/* NYT/Purist gets compact newspaper masthead */
	:global(body[data-theme="purist"]) .bauhaus-header {
		border: none;
		padding: 0;
		margin-bottom: var(--space-md);
	}

	.name-heading {
		font-family: var(--font-display);
		font-size: var(--font-size-hero);
		line-height: var(--line-height-tight);
		text-transform: uppercase;
		font-weight: 900;
		margin: 0;
		letter-spacing: -0.03em;
	}

	/* NYT masthead - compact name */
	:global(body[data-theme="purist"]) .name-heading {
		font-family: var(--font-display);
		font-size: clamp(24px, 3vw, 32px);
		font-weight: 700;
		text-transform: none;
		letter-spacing: 0;
		line-height: 1.2;
		margin-bottom: 4px;
	}

	.subtitle {
		font-family: var(--font-body);
		font-size: var(--font-size-body);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		margin-top: var(--space-sm);
		opacity: 0.7;
	}

	:global(body[data-theme="purist"]) .subtitle {
		font-family: var(--font-body-alt);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.1em;
		margin-top: 0;
		margin-bottom: var(--space-sm);
		opacity: 0.5;
	}

	.button-container {
		display: flex;
		gap: var(--space-sm);
		margin-top: var(--space-lg);
		flex-wrap: wrap;
	}

	/* NYT masthead - compact link bar */
	:global(body[data-theme="purist"]) .button-container {
		margin-top: var(--space-xs);
		gap: var(--space-md);
	}

	.icon-button {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-sm);
		border: var(--border-width) solid var(--border-color);
		background: var(--bg-color);
		color: var(--text-color);
		font-family: var(--font-body);
		font-weight: 700;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.icon-button svg {
		width: 20px;
		height: 20px;
		fill: currentColor;
	}

	.icon-button:hover {
		background: var(--text-color);
		color: var(--bg-color);
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--border-color);
	}

	/* NYT/Purist buttons become simple text links */
	:global(body[data-theme="purist"]) .icon-button {
		border: none;
		background: transparent;
		padding: 0;
		font-size: var(--font-size-small);
		font-weight: 400;
		text-decoration: underline;
		text-underline-offset: 2px;
		text-decoration-thickness: 1px;
		gap: 6px;
	}

	:global(body[data-theme="purist"]) .icon-button svg {
		width: 16px;
		height: 16px;
	}

	:global(body[data-theme="purist"]) .icon-button:hover {
		transform: none;
		box-shadow: none;
		background: transparent;
		text-decoration-thickness: 1.5px;
	}

	.button-label {
		font-size: 0.75rem;
		letter-spacing: 0.05em;
	}

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin-top: var(--space-md);
		font-family: var(--font-body);
		font-size: 0.875rem;
	}

	.spinner {
		border: var(--border-width) solid var(--border-color);
		border-top: var(--border-width) solid var(--accent-color);
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
		margin: var(--space-md) 0;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@media (max-width: 768px) {
		.bauhaus-header {
			padding: 0;
		}

		.name-heading {
			font-size: clamp(24px, 8vw, 32px);
		}

		:global(body[data-theme="purist"]) .name-heading {
			font-size: clamp(20px, 6vw, 24px);
			margin-bottom: 2px;
		}

		:global(body[data-theme="purist"]) .subtitle {
			font-size: 10px;
			margin-bottom: var(--space-xs);
		}

		:global(body[data-theme="purist"]) .button-container {
			margin-top: var(--space-xs);
			gap: var(--space-sm);
		}
	}
</style>
