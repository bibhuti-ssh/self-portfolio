<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import BookCard from '$lib/components/ui/BookCard.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Reading — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="page-title">Reading</h1>
		<p class="page-desc">Books and articles that shaped how I think.</p>

		<AsciiDivider style="thin" />

		<div class="reading-header" aria-hidden="true">
			<span>ST</span>
			<span>TITLE</span>
			<span>AUTHOR</span>
			<span>RATING</span>
		</div>
	{:else}
		<h1># Reading</h1>
	{/if}

	{#each data.readings as reading}
		<BookCard {reading} />
	{/each}
</section>

<style>
	.page {
		padding: var(--space-12) 0;
	}

	.page-title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-3);
	}

	.page-desc {
		color: var(--fg-secondary);
		font-size: var(--text-md);
		margin-bottom: var(--space-2);
	}

	.reading-header {
		display: grid;
		grid-template-columns: 2ch 1fr auto auto;
		gap: var(--space-3);
		padding: var(--space-1) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-ghost);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		border-bottom: 1px solid var(--border-ghost);
		margin-bottom: var(--space-2);
	}
</style>
