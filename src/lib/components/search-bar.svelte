<script>
	import search from '$lib/stores/search.svelte';

	/** @param {*} e */
	function onInput(e) {
		search.updateQuery(e.target.value);
	}
</script>

<div class="search-bar">
	<input oninput={onInput} type="text" placeholder="Search" />
	<img src="/icons/search-icon.svg" alt="search-icon" />
</div>

<style>
	.search-bar {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top:1rem;
		width:275px;
		margin-left:1rem;
	}
	input {
		width: 90%;
		font-size: 1rem;
		border: none;
		border-bottom: 2px solid var(--secondary-color);
		background-color: var(--primary-color);
		color: var(--secondary-color);
		outline: none;
		padding: 0.5rem;
	}
	input::placeholder {
		opacity: 0.0;
		font-family: monospace;
		font-size: .75rem;
		color: var(--secondary-color);
	}
	img {
		width: 1rem;
		height: 1rem;
		margin-left: -10px;
	}
</style>
