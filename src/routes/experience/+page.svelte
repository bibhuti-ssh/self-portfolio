<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	const experiences = [
		{
			role: 'Founding Engineer',
			company: 'DroidRun',
			date: '2025 — present',
			description: 'Building cloud platform for AI-powered mobile device automation. Designing the SvelteKit frontend, Python/FastAPI backend, real-time device streaming, and LLM agent framework.'
		},
		{
			role: 'Open Source Contributor',
			company: 'LLM Agent Tooling',
			date: '2024 — present',
			description: 'Contributing to orchestration frameworks for LLM-powered agents. Building tooling that helps developers ship AI-native applications faster.'
		},
		{
			role: 'Systems Design Study',
			company: 'Independent',
			date: '2024',
			description: 'Intensive deep dive into distributed systems — consensus algorithms (Raft, Paxos), CRDTs, eventual consistency, and stream processing architectures.'
		}
	];
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

	{#each experiences as exp}
		{#if mode.isHuman}
			<div class="item">
				<div class="item-top">
					<span class="item-role">{exp.role}</span>
					<span class="item-date">{exp.date}</span>
				</div>
				<span class="item-company">{exp.company}</span>
				<p class="item-desc">{exp.description}</p>
			</div>
		{:else}
			<p>- **{exp.role}** at {exp.company} ({exp.date}): {exp.description}</p>
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

	.item-role {
		font-weight: 700;
		font-size: var(--text-md);
	}

	.item-date {
		font-size: var(--text-xs);
		color: var(--fg-3);
		flex-shrink: 0;
	}

	.item-company {
		font-size: var(--text-sm);
		color: var(--fg-3);
		display: block;
		margin-top: var(--space-1);
	}

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
