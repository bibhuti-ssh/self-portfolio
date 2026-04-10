<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import type { Reading } from '$lib/types/content';

	let { reading }: { reading: Reading } = $props();

	const statusIcon: Record<string, string> = {
		read: '█',
		reading: '▓',
		'to-read': '░'
	};

	function ratingBar(n: number): string {
		return '█'.repeat(n) + '░'.repeat(5 - n);
	}
</script>

{#if mode.isAgent}
	<div class="agent-entry">
		<p>- [{reading.status}] *{reading.title}* — {reading.author} ({ratingBar(reading.rating)})</p>
	</div>
{:else}
	<a href="/readings/{reading.slug}" class="book-row">
		<span class="status" aria-label="Status: {reading.status}">
			{statusIcon[reading.status] ?? '░'}
		</span>
		<span class="title">{reading.title}</span>
		<span class="author">— {reading.author}</span>
		<span class="rating" aria-label="{reading.rating} out of 5">
			{ratingBar(reading.rating)}
		</span>
	</a>
{/if}

<style>
	.book-row {
		display: grid;
		grid-template-columns: 2ch 1fr auto auto;
		gap: var(--space-3);
		align-items: baseline;
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		text-decoration: none;
		color: var(--fg-primary);
		transition: background 120ms ease;
		border-radius: 2px;
	}

	.book-row:hover {
		background: var(--bg-secondary);
	}

	.book-row:hover .title {
		color: var(--accent);
	}

	.status {
		color: var(--fg-secondary);
		text-align: center;
	}

	.title {
		font-family: var(--font-body);
		font-style: italic;
		font-size: var(--text-base);
		color: var(--fg-primary);
		transition: color 120ms ease;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.author {
		color: var(--fg-tertiary);
		white-space: nowrap;
	}

	.rating {
		color: var(--fg-secondary);
		letter-spacing: 0.05em;
	}

	.agent-entry {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		padding: var(--space-1) 0;
	}

	@media (max-width: 640px) {
		.book-row {
			grid-template-columns: 2ch 1fr;
		}

		.author, .rating {
			display: none;
		}
	}
</style>
