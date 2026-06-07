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

	<div class="timeline">
		{#each data.experience as exp}
			{#if mode.isHuman}
				<div class="item">
					<div class="item-top">
						<span class="item-title">
							<span class="item-company">{exp.company}</span>
							<span class="item-role">{exp.role}</span>
						</span>
						<span class="item-date">{exp.date}</span>
					</div>
					<p class="item-desc">{exp.description}</p>
				</div>
			{:else}
				<p>- **{exp.company}** — {exp.role} ({exp.date}): {exp.description}</p>
			{/if}
		{/each}
	</div>
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }
	.desc { color: var(--fg-2); font-size: var(--text-sm); }

	.timeline {
		position: relative;
		margin-top: var(--space-2);
	}

	.item {
		position: relative;
		padding: var(--space-4) 0 var(--space-4) var(--space-8);
		border-bottom: 1px solid var(--border);
	}

	.item::before {
		content: '';
		position: absolute;
		left: 0.42rem;
		top: 0;
		bottom: 0;
		width: 1px;
		background: var(--border);
	}

	.item:first-child::before { top: var(--space-4); }
	.item:last-child::before { bottom: calc(100% - var(--space-4)); }

	.item::after {
		content: '';
		position: absolute;
		left: 0.17rem;
		top: var(--space-4);
		width: 0.55rem;
		height: 0.55rem;
		border: 1px solid var(--accent);
		background: var(--bg);
		box-shadow: 0 0 0 3px var(--bg);
	}

	.item-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-4);
	}

	.item-title {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		min-width: 0;
	}

	.item-company {
		color: var(--accent);
		font-weight: 700;
		font-size: var(--text-lg);
		line-height: var(--leading-tight);
	}

	.item-role {
		color: var(--fg);
		font-size: var(--text-md);
		font-weight: 700;
		line-height: var(--leading-snug);
	}

	.item-date {
		font-size: var(--text-xs);
		color: var(--fg-3);
		flex-shrink: 0;
		padding-top: 0.1rem;
	}

	.item-desc {
		color: var(--fg-2);
		margin-top: var(--space-2);
		line-height: var(--leading-normal);
	}

	@media (max-width: 480px) {
		.page { padding: var(--space-4) 0; }
		.item { padding-left: var(--space-6); }
		.item-top { flex-direction: column; gap: var(--space-1); }
	}
</style>
