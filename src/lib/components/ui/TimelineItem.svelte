<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import type { TimelineEntry } from '$lib/types/content';

	let { entry, isLast = false }: { entry: TimelineEntry; isLast?: boolean } = $props();
	let open = $state(false);
</script>

{#if mode.isAgent}
	<p>- **{entry.date}** — {entry.title}: {entry.description}</p>
{:else}
	<div class="item">
		<div class="line" aria-hidden="true">
			<span class="dot" class:open>{open ? '◉' : '○'}</span>
			{#if !isLast}<span class="stem">│</span>{/if}
		</div>

		<div class="body">
			<button class="head" onclick={() => (open = !open)} aria-expanded={open}>
				<time>{entry.date}</time>
				<span class="head-title">{entry.title}</span>
				<span class="badge">{entry.type}</span>
			</button>
			{#if open}
				<p class="desc">{entry.description}</p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.item {
		display: flex;
		gap: var(--space-3);
	}

	.line {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--fg-muted);
		width: 1.5ch;
		flex-shrink: 0;
		padding-top: var(--space-2);
	}

	.dot {
		font-size: var(--text-sm);
		line-height: 1;
		transition: color 80ms;
	}
	.dot.open { color: var(--accent); }

	.stem {
		font-size: var(--text-xs);
		line-height: 2;
	}

	.body {
		flex: 1;
		min-width: 0;
		padding-bottom: var(--space-3);
	}

	.head {
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
		width: 100%;
		text-align: left;
		padding: var(--space-1) 0;
	}
	.head:hover .head-title { color: var(--accent); }

	.head time {
		font-size: var(--text-xs);
		color: var(--fg-3);
		flex-shrink: 0;
	}

	.head-title {
		font-size: var(--text-md);
		font-weight: 700;
		transition: color 80ms;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.badge {
		font-size: var(--text-xs);
		color: var(--fg-muted);
		flex-shrink: 0;
	}

	.desc {
		color: var(--fg-2);
		line-height: var(--leading-normal);
		padding: var(--space-1) 0;
	}

	@media (max-width: 480px) {
		.head {
			flex-wrap: wrap;
			gap: var(--space-1);
		}
		.badge { display: none; }
	}
</style>
