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

<img style="" src="/headings/header_1.svg" alt="header" />
<div class="button-container">
	<button onclick={fetchContact} class="contact-button">Contact</button>
	<a href="https://github.com/aklevecz" class="contact-button"
		><svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			version="1.1"
			data-view-component="true"
			class="octicon octicon-mark-github v-align-middle"
			fill="currentColor"
		>
			<path
				d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"
			></path>
		</svg></a
	>
	<a href="https://www.linkedin.com/in/ariel-klevecz/" class="contact-button"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			data-supported-dps="24x24"
			fill="currentColor"
			class="mercado-match"
			focusable="false"
		>
			<path
				d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
			></path>
		</svg></a
	>
</div>
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
	.button-container {
		display: flex;
		height: 30px;
		width: 200px;
		gap: 12px;
		margin-left:1.5rem;
		/* justify-content: center; */
		/* margin: 1rem auto; */
	}

	svg {
		width: 100%;
		height: 100%;
	}
	.contact-button {
		/* background: none; */
		border-radius: 20px;
		/* border-bottom: 1px solid white; */
		/* color: white; */
		/* width: 70px; */
		/* margin-left: 1.5rem; */
		/* margin: auto; */
		/* width: 70px; */
		font-size: 0.5rem;
		font-weight: bold;
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
