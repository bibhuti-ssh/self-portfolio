<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';

	let {
		src,
		alt,
		caption = '',
		index = 1
	}: { src: string; alt: string; caption?: string; index?: number } = $props();
</script>

{#if mode.isAgent}
	<p>![{alt}]({src}){caption ? ` — ${caption}` : ''}</p>
{:else}
	<figure class="image-block">
		<div class="image-container">
			<img {src} {alt} loading="lazy" />
		</div>
		{#if caption}
			<figcaption>fig.{index} — {caption}</figcaption>
		{/if}
	</figure>
{/if}

<style>
	.image-block {
		margin: var(--space-6) 0;
	}

	.image-container {
		overflow: hidden;
		border: 1px solid var(--border-ghost);
	}

	img {
		width: 100%;
		filter: grayscale(1) contrast(1.1);
		transition: filter 300ms ease;
	}

	img:hover {
		filter: grayscale(0.5) contrast(1.05);
	}

	figcaption {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		margin-top: var(--space-2);
	}
</style>
