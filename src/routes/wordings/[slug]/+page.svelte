<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.post.title} — Wordings — Bibhuti Jha</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="post-detail">
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
		<p>date: {data.post.date} | tags: {data.post.tags.join(', ')}</p>
	{/if}

	<AsciiDivider style="double" />

	<div class="content">
		<data.post.content />
	</div>
</article>

<style>
	.post-detail {
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

	.date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		display: block;
		margin-bottom: var(--space-2);
	}

	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-3);
	}

	.tags {
		display: flex;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		padding: var(--space-1) var(--space-2);
		border: 1px solid var(--border-ghost);
		border-radius: 2px;
	}

	.content {
		line-height: var(--leading-relaxed);
		max-width: var(--measure);
	}

	.content :global(h2) {
		font-family: var(--font-display);
		font-size: var(--text-xl);
		margin-top: var(--space-8);
		margin-bottom: var(--space-4);
	}

	.content :global(p) { margin-bottom: var(--space-4); }

	.content :global(blockquote) {
		border-left: 3px solid var(--border-secondary);
		padding-left: var(--space-4);
		color: var(--fg-secondary);
		font-style: italic;
		margin: var(--space-6) 0;
	}

	.content :global(code) {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--bg-code);
		padding: 0.1em 0.3em;
		border-radius: 2px;
	}
</style>
