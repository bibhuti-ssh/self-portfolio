<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.reading.title} — Reading — Bibhuti Jha</title>
</svelte:head>

<article class="reading-detail">
	{#if mode.isHuman}
		<a href="/readings" class="back">← reading</a>
		<h1 class="title">{data.reading.title}</h1>
		<p class="author">by {data.reading.author}</p>
		<div class="meta">
			<span class="rating">{'█'.repeat(data.reading.rating)}{'░'.repeat(5 - data.reading.rating)}</span>
			<span class="date">{data.reading.dateRead}</span>
			<span class="type">[{data.reading.type}]</span>
		</div>
	{:else}
		<h1># {data.reading.title}</h1>
		<p>author: {data.reading.author} | rating: {data.reading.rating}/5 | type: {data.reading.type}</p>
	{/if}

	<AsciiDivider style="double" />

	<div class="content">
		<data.reading.content />
	</div>
</article>

<style>
	.reading-detail {
		padding: var(--space-12) 0;
		max-width: var(--measure-wide);
	}

	.back {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--fg-tertiary);
		text-decoration: none;
		display: inline-block;
		margin-bottom: var(--space-6);
	}

	.back:hover { color: var(--accent); }

	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-2);
	}

	.author {
		font-size: var(--text-md);
		color: var(--fg-secondary);
		margin-bottom: var(--space-3);
	}

	.meta {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--fg-tertiary);
		display: flex;
		gap: var(--space-3);
	}

	.content {
		line-height: var(--leading-relaxed);
		max-width: var(--measure);
	}

	.content :global(p) { margin-bottom: var(--space-4); }
</style>
