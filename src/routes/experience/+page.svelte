<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Experience — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="title">Experience</h1>
		<p class="desc">Where I've worked and what I've built.</p>
	{:else}
		<h1># Experience</h1>
	{/if}
	<AsciiDivider style="thin" />

	{#each data.experience as exp}
		{#if mode.isHuman}
			<div class="item">
				<div class="item-top">
					<span class="item-title">
						<span class="item-role">{exp.role}</span>
						<span class="item-at">@</span>
						<span class="item-company">{exp.company}</span>
					</span>
					<span class="item-date">{exp.date}</span>
				</div>
				<p class="item-desc">{exp.description}</p>
			</div>
		{:else}
			<p>- **{exp.role} @ {exp.company}** ({exp.date}): {exp.description}</p>
		{/if}
	{/each}
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }
	.desc { color: var(--fg-2); font-size: var(--text-sm); }

	.item {
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--border);
	}

	.item-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-2);
	}

	.item-title {
		display: flex;
		align-items: baseline;
		flex-wrap: wrap;
		gap: var(--space-1);
		min-width: 0;
	}

	.item-role,
	.item-company {
		font-weight: 700;
		font-size: var(--text-md);
	}

	.item-at {
		color: var(--accent);
		font-weight: 700;
	}

	.item-company { color: var(--fg); }
	.item-date { font-size: var(--text-xs); color: var(--fg-3); flex-shrink: 0; }

	.item-desc {
		color: var(--fg-2);
		margin-top: var(--space-2);
		line-height: var(--leading-normal);
	}

	@media (max-width: 480px) {
		.page { padding: var(--space-4) 0; }
		.item-top { flex-direction: column; gap: 0; }
	}
</style>
