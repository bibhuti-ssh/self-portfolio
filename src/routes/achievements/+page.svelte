<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	const achievements = [
		{ title: 'DroidRun Cloud Launch', date: '2025', description: 'Shipped the initial release of a cloud platform for AI-powered mobile automation.' },
		{ title: 'Open Source Contributor', date: '2024', description: 'Contributed to LLM agent orchestration tooling used by hundreds of developers.' },
		{ title: 'Systems Design Deep Dive', date: '2024', description: 'Completed intensive study of distributed systems, from Raft consensus to CRDT merge strategies.' }
	];
</script>

<svelte:head>
	<title>Achievements — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="page-title">Achievements</h1>
		<AsciiDivider style="thin" />
	{:else}
		<h1># Achievements</h1>
	{/if}

	<div class="achievement-list">
		{#each achievements as item}
			{#if mode.isHuman}
				<div class="achievement">
					<div class="achievement-header">
						<span class="marker" aria-hidden="true">◆</span>
						<h2 class="achievement-title">{item.title}</h2>
						<span class="achievement-date">{item.date}</span>
					</div>
					<p class="achievement-desc">{item.description}</p>
				</div>
			{:else}
				<p>- **{item.title}** ({item.date}): {item.description}</p>
			{/if}
		{/each}
	</div>
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
		margin-bottom: var(--space-2);
	}

	.achievement-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.achievement {
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--border-ghost);
	}

	.achievement-header {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
	}

	.marker {
		color: var(--accent);
		flex-shrink: 0;
	}

	.achievement-title {
		font-family: var(--font-display);
		font-size: var(--text-lg);
		line-height: var(--leading-snug);
	}

	.achievement-date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		flex-shrink: 0;
		margin-left: auto;
	}

	.achievement-desc {
		color: var(--fg-secondary);
		line-height: var(--leading-normal);
		max-width: var(--measure);
		padding-left: calc(1em + var(--space-3));
	}
</style>
