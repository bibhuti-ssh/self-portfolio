<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import TimelineItem from '$lib/components/ui/TimelineItem.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Timeline — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="title">Life</h1>
		<p class="desc">The path so far, roughly ordered.</p>
	{:else}
		<h1># Timeline</h1>
	{/if}
	<AsciiDivider style="thin" />
	{#each data.entries as entry, i}
		<TimelineItem {entry} isLast={i === data.entries.length - 1} />
	{/each}
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }
	.desc { color: var(--fg-2); font-size: var(--text-sm); }

	@media (max-width: 480px) { .page { padding: var(--space-4) 0; } }
</style>
