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

<img style="" src="/headings/header.png" alt="header" />

<button onclick={fetchContact} class="contact-button">Contact</button>
{#if fetching}
	<div class="spinner"></div>
{/if}
{#if contact.email}
	<div style="display:flex;gap:1rem;margin:1rem;">
		<div>{contact.email}</div>
		<div>{contact.phone}</div>
	</div>
{/if}

<style>
	img {
		width: 90%;
		display: block;
		margin: 1rem auto;
	}

	.contact-button {
		background: none;
		border-bottom: 1px solid white;
		color: white;
		/* width: 70px; */
		/* margin-left: 1.5rem; */
		margin: auto;
	}

	@media (min-width: 768px) {
		img {
			max-width: 500px;
		}
	}

	.spinner {
		border: 4px solid rgba(255, 255, 255, 0.3);
		border-top: 4px solid white;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		animation: spin 1s linear infinite;
		margin: 1rem auto;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
