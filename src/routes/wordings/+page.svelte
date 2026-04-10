<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Wordings — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="page-title">Wordings</h1>
		<p class="page-desc">Thoughts, observations, and things I needed to write down.</p>
		<AsciiDivider style="thin" />
	{:else}
		<h1># Wordings</h1>
	{/if}

	<div class="post-list">
		{#each data.wordings as post}
			<a href="/wordings/{post.slug}" class="post-item">
				<time class="post-date">{post.date}</time>
				<div class="post-info">
					<h2 class="post-title">{post.title}</h2>
					{#if mode.isHuman}
						<p class="post-desc">{post.description}</p>
					{/if}
				</div>
				{#if mode.isHuman}
					<div class="post-tags">
						{#each post.tags.slice(0, 3) as tag}
							<span class="tag">{tag}</span>
						{/each}
					</div>
				{/if}
			</a>
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
		margin-bottom: var(--space-3);
	}

	.page-desc {
		color: var(--fg-secondary);
		font-size: var(--text-md);
		margin-bottom: var(--space-2);
	}

	.post-list {
		display: flex;
		flex-direction: column;
	}

	.post-item {
		display: flex;
		align-items: flex-start;
		gap: var(--space-4);
		padding: var(--space-4) var(--space-3);
		text-decoration: none;
		color: var(--fg-primary);
		transition: background 120ms ease;
		border-bottom: 1px solid var(--border-ghost);
	}

	.post-item:hover {
		background: var(--bg-secondary);
	}

	.post-item:hover .post-title {
		color: var(--accent);
	}

	.post-date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		flex-shrink: 0;
		padding-top: 0.3em;
	}

	.post-info {
		flex: 1;
	}

	.post-title {
		font-family: var(--font-display);
		font-size: var(--text-md);
		line-height: var(--leading-snug);
		transition: color 120ms ease;
		margin-bottom: var(--space-1);
	}

	.post-desc {
		font-size: var(--text-sm);
		color: var(--fg-tertiary);
		line-height: var(--leading-normal);
	}

	.post-tags {
		display: flex;
		gap: var(--space-1);
		flex-shrink: 0;
	}

	.tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-ghost);
	}
</style>
