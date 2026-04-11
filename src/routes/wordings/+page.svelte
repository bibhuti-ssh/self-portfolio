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
		<h1 class="title">Wordings</h1>
		<p class="desc">Thoughts, observations, and things I needed to write down.</p>
	{:else}
		<h1># Wordings</h1>
	{/if}
	<AsciiDivider style="thin" />

	{#each data.wordings as post}
		<a href="/wordings/{post.slug}" class="item">
			<div class="item-top">
				<time>{post.date}</time>
				<h2 class="item-title">{post.title}</h2>
			</div>
			{#if mode.isHuman && post.description}
				<p class="item-desc">{post.description}</p>
			{/if}
		</a>
	{/each}
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }
	.desc { color: var(--fg-2); font-size: var(--text-sm); }

	.item {
		display: block;
		padding: var(--space-3) 0;
		text-decoration: none;
		color: inherit;
		border-bottom: 1px solid var(--border);
	}
	.item:hover .item-title { color: var(--accent); }

	.item-top {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
	}

	.item-top time {
		font-size: var(--text-xs);
		color: var(--fg-3);
		flex-shrink: 0;
	}

	.item-title {
		font-weight: 700;
		font-size: var(--text-md);
		transition: color 80ms;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	.item-desc {
		font-size: var(--text-sm);
		color: var(--fg-3);
		margin-top: var(--space-1);
	}

	@media (max-width: 480px) {
		.page { padding: var(--space-4) 0; }
		.item-top { flex-direction: column; gap: 0; }
	}
</style>
