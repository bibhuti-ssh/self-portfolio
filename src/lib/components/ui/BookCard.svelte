<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import type { Reading } from '$lib/types/content';

	let { reading }: { reading: Reading } = $props();

	const icons: Record<string, string> = { read: '█', reading: '▓', 'to-read': '░' };
	const bar = (n: number) => '█'.repeat(n) + '░'.repeat(5 - n);
</script>

{#if mode.isAgent}
	<p>- [{reading.status}] *{reading.title}* — {reading.author} ({bar(reading.rating)})</p>
{:else}
	<a href="/readings/{reading.slug}" class="row">
		<span class="icon">{icons[reading.status] ?? '░'}</span>
		<span class="title">{reading.title}</span>
		<span class="meta">{reading.author}</span>
		<span class="meta rating">{bar(reading.rating)}</span>
	</a>
{/if}

<style>
	.row {
		display: grid;
		grid-template-columns: 1.5ch 1fr auto auto;
		gap: var(--space-2);
		align-items: baseline;
		padding: var(--space-1) 0;
		font-size: var(--text-sm);
		text-decoration: none;
		color: inherit;
	}
	.row:hover .title { color: var(--accent); }

	.icon { color: var(--fg-3); text-align: center; }

	.title {
		font-style: italic;
		transition: color 80ms;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	.meta {
		color: var(--fg-3);
		white-space: nowrap;
		font-size: var(--text-xs);
	}

	.rating { letter-spacing: 0.02em; }

	@media (max-width: 480px) {
		.row { grid-template-columns: 1.5ch 1fr; }
		.meta { display: none; }
	}
</style>
