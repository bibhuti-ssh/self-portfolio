<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import TimelineItem from '$lib/components/ui/TimelineItem.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	const entries = [
		{ title: 'Started building DroidRun Cloud', date: '2025.06', type: 'career' as const, description: 'Cloud platform for AI-powered mobile device automation. SvelteKit frontend, Python/FastAPI backend.' },
		{ title: 'Deep dive into distributed systems', date: '2024.09', type: 'education' as const, description: 'Intensive study of consensus algorithms, CRDTs, and eventual consistency patterns.' },
		{ title: 'First open source contribution', date: '2024.03', type: 'career' as const, description: 'Contributed to tooling around LLM agent orchestration.' },
		{ title: 'Discovered the terminal aesthetic', date: '2023.11', type: 'personal' as const, description: 'Switched to a tiling window manager, started caring about monospace fonts more than is healthy.' }
	];
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
	{#each entries as entry, i}
		<TimelineItem {entry} isLast={i === entries.length - 1} />
	{/each}
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }
	.desc { color: var(--fg-2); font-size: var(--text-sm); }

	@media (max-width: 480px) { .page { padding: var(--space-4) 0; } }
</style>
