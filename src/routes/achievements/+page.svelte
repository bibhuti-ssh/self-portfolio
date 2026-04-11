<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Achievements — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="title">Achievements</h1>
	{:else}
		<h1># Achievements</h1>
	{/if}
	<AsciiDivider style="thin" />

	{#each data.achievements as item}
		{#if mode.isHuman}
			<div class="item">
				<div class="item-head">
					<span class="dot">◆</span>
					<h2 class="item-title">{item.title}</h2>
					<span class="item-date">{item.date}</span>
				</div>
				<p class="item-desc">{item.description}</p>
			</div>
		{:else}
			<p>- **{item.title}** ({item.date}): {item.description}</p>
		{/if}
	{/each}
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }

	.item {
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border);
	}

	.item-head {
		display: flex;
		align-items: baseline;
		gap: var(--space-2);
	}

	.dot { color: var(--accent); flex-shrink: 0; font-size: var(--text-xs); }
	.item-title { font-weight: 700; font-size: var(--text-md); min-width: 0; }
	.item-date { font-size: var(--text-xs); color: var(--fg-3); margin-left: auto; flex-shrink: 0; }

	.item-desc {
		color: var(--fg-2);
		margin-top: var(--space-1);
		padding-left: calc(0.7em + var(--space-2));
	}

	@media (max-width: 480px) {
		.page { padding: var(--space-4) 0; }
		.item-desc { padding-left: 0; }
	}
</style>
