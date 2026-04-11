<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.reading.title} — Reading — Bibhuti Jha</title>
</svelte:head>

<article class="detail">
	{#if mode.isHuman}
		<a href="/readings" class="back">← reading</a>
		<h1 class="title">{data.reading.title}</h1>
		<p class="author">by {data.reading.author}</p>
		<div class="meta">
			<span>{'█'.repeat(data.reading.rating)}{'░'.repeat(5 - data.reading.rating)}</span>
			<span>{data.reading.dateRead}</span>
			<span>[{data.reading.type}]</span>
		</div>
	{:else}
		<h1># {data.reading.title}</h1>
		<p style="color:var(--fg-2)">author: {data.reading.author} | rating: {data.reading.rating}/5</p>
	{/if}

	<AsciiDivider style="thin" />

	<div class="content">
		<data.reading.content />
	</div>
</article>

<style>
	.detail { padding: var(--space-6) 0; }

	.back {
		font-size: var(--text-xs);
		color: var(--fg-3);
		text-decoration: none;
		display: inline-block;
		margin-bottom: var(--space-4);
	}
	.back:hover { color: var(--accent); }

	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-2xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-1);
	}

	.author { font-size: var(--text-sm); color: var(--fg-2); margin-bottom: var(--space-2); }

	.meta {
		font-size: var(--text-xs);
		color: var(--fg-3);
		display: flex;
		gap: var(--space-2);
	}

	.content { line-height: var(--leading-relaxed); }
	.content :global(p) { margin-bottom: var(--space-3); color: var(--fg-2); }
</style>
