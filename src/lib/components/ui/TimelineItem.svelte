<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import type { TimelineEntry } from '$lib/types/content';

	let { entry, isLast = false }: { entry: TimelineEntry; isLast?: boolean } = $props();
	let expanded = $state(false);
</script>

{#if mode.isAgent}
	<div class="agent-entry">
		<p>- **{entry.date}** — {entry.title}: {entry.description}</p>
	</div>
{:else}
	<div class="timeline-entry">
		<div class="connector" aria-hidden="true">
			<span class="pipe">│</span>
			<button
				class="node"
				onclick={() => (expanded = !expanded)}
				aria-expanded={expanded}
				aria-label="Toggle details for {entry.title}"
			>
				{expanded ? '◉' : '○'}
			</button>
			{#if !isLast}
				<span class="pipe">│</span>
			{/if}
		</div>

		<div class="content">
			<button
				class="header"
				onclick={() => (expanded = !expanded)}
				aria-expanded={expanded}
			>
				<time class="date">{entry.date}</time>
				<h3 class="title">{entry.title}</h3>
				<span class="type-badge">[{entry.type}]</span>
			</button>

			{#if expanded}
				<div class="body">
					<p>{entry.description}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.timeline-entry {
		display: flex;
		gap: var(--space-4);
	}

	.connector {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: var(--font-mono);
		color: var(--fg-ghost);
		width: 3ch;
		flex-shrink: 0;
	}

	.pipe {
		line-height: 1.2;
	}

	.node {
		font-family: var(--font-mono);
		font-size: var(--text-base);
		color: var(--fg-tertiary);
		padding: var(--space-1) 0;
		transition: color 120ms ease, transform 200ms ease;
	}

	.node:hover {
		color: var(--accent);
		transform: scale(1.3);
	}

	.content {
		flex: 1;
		padding-bottom: var(--space-4);
	}

	.header {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		width: 100%;
		text-align: left;
		padding: var(--space-1) 0;
	}

	.header:hover .title {
		color: var(--accent);
	}

	.date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		flex-shrink: 0;
	}

	.title {
		font-family: var(--font-display);
		font-size: var(--text-md);
		line-height: var(--leading-snug);
		transition: color 120ms ease;
	}

	.type-badge {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-ghost);
		flex-shrink: 0;
	}

	.body {
		padding: var(--space-3) 0;
		color: var(--fg-secondary);
		line-height: var(--leading-normal);
		max-width: var(--measure);
	}

	.agent-entry {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		padding: var(--space-1) 0;
	}
</style>
