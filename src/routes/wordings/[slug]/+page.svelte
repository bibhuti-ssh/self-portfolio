<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} — Wordings — Bibhuti Jha</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="detail">
	{#if mode.isHuman}
		<a href="/wordings" class="back">← wordings</a>
		<time class="date">{data.post.date}</time>
		<h1 class="title">{data.post.title}</h1>
		<div class="tags">
			{#each data.post.tags as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>
	{:else}
		<h1># {data.post.title}</h1>
		<p style="color:var(--fg-2)">date: {data.post.date} | tags: {data.post.tags.join(', ')}</p>
	{/if}

	<AsciiDivider style="thin" />

	<div class="content">
		<data.post.content />
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

	.date { font-size: var(--text-xs); color: var(--fg-3); display: block; margin-bottom: var(--space-1); }

	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-2xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-2);
	}

	.tags { display: flex; gap: var(--space-1); flex-wrap: wrap; }
	.tag { font-size: var(--text-xs); color: var(--fg-3); padding: 1px var(--space-2); border: 1px solid var(--border); }

	.content { line-height: var(--leading-relaxed); }
	.content :global(h2) { font-weight: 700; font-size: var(--text-lg); margin: var(--space-6) 0 var(--space-2); }
	.content :global(p) { margin-bottom: var(--space-3); color: var(--fg-2); }
	.content :global(blockquote) { border-left: 2px solid var(--border); padding-left: var(--space-3); color: var(--fg-3); font-style: italic; margin: var(--space-4) 0; }
	.content :global(code) { font-size: var(--text-sm); background: var(--bg-code); padding: 1px 4px; }
</style>
