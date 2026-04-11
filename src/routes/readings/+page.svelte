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
		<h1 class="title">Reading</h1>
		<p class="desc">Books and articles that shaped how I think.</p>
	{:else}
		<h1># Reading</h1>
	{/if}
	<AsciiDivider style="thin" />
	{#each data.readings as reading}
		<BookCard {reading} />
	{/each}
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }
	.desc { color: var(--fg-2); font-size: var(--text-sm); }

	@media (max-width: 480px) { .page { padding: var(--space-4) 0; } }
</style>
