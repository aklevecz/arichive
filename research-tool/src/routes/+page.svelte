<svelte:head>
	<title>Research Tool</title>
</svelte:head>

<h1>Read. Highlight. Explain. Accumulate.</h1>
<p class="muted">
	A tool for the platforms-and-power research. Paste what you're reading, highlight a passage, and
	get an explanation framed by the project thesis and the seven anchor thinkers (McLuhan, Latour,
	Marx, Debord, Foucault, Deleuze, Han). Every explanation you keep grows a searchable knowledge
	base.
</p>

<div class="cards">
	<a class="panel card" href="/reader">
		<h2>Reader →</h2>
		<p class="muted">Paste text, highlight a passage, get an explanation, save it.</p>
	</a>
	<a class="panel card" href="/kb">
		<h2>Knowledge base →</h2>
		<p class="muted">Browse, filter by thinker, and search everything you've saved.</p>
	</a>
</div>

<style>
	.cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 2rem;
	}
	.card h2 {
		margin: 0 0 0.4rem;
	}
	.card p {
		margin: 0;
	}
	@media (max-width: 640px) {
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>
