<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.project.title} — Bibhuti Jha</title>
	<meta name="description" content={data.project.description} />
</svelte:head>

<article class="project-detail">
	{#if mode.isHuman}
		<header>
			<a href="/projects" class="back">← projects</a>
			<h1 class="title">{data.project.title}</h1>
			<div class="meta">
				<span class="date">{data.project.date}</span>
				<span class="status" class:active={data.project.status === 'active'}>[{data.project.status.toUpperCase()}]</span>
			</div>
			<div class="tech">
				{#each data.project.techStack as tech}
					<span class="tag">{tech}</span>
				{/each}
			</div>
			{#if data.project.url || data.project.repo}
				<div class="links">
					{#if data.project.url}<a href={data.project.url} target="_blank" rel="noopener">visit →</a>{/if}
					{#if data.project.repo}<a href={data.project.repo} target="_blank" rel="noopener">source →</a>{/if}
				</div>
			{/if}
		</header>
	{:else}
		<header>
			<h1># {data.project.title}</h1>
			<p>date: {data.project.date} | status: {data.project.status}</p>
			<p>stack: {data.project.techStack.join(', ')}</p>
		</header>
	{/if}

	<AsciiDivider style="double" />

	<div class="content">
		<data.project.content />
	</div>
</article>

<style>
	.project-detail {
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

	.back:hover {
		color: var(--accent);
	}

	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-3);
	}

	.meta {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--fg-tertiary);
		display: flex;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.status.active {
		color: var(--accent);
	}

	.tech {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-bottom: var(--space-4);
	}

	.tag {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--fg-tertiary);
		padding: var(--space-1) var(--space-2);
		border: 1px solid var(--border-ghost);
		border-radius: 2px;
	}

	.links {
		display: flex;
		gap: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}

	.links a {
		color: var(--fg-secondary);
		text-decoration: none;
	}

	.links a:hover {
		color: var(--accent);
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

	.content :global(p) {
		margin-bottom: var(--space-4);
	}

	.content :global(code) {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--bg-code);
		padding: 0.1em 0.3em;
		border-radius: 2px;
	}

	.content :global(pre) {
		background: var(--bg-code);
		padding: var(--space-4);
		overflow-x: auto;
		margin-bottom: var(--space-4);
		border: 1px solid var(--border-ghost);
		border-radius: 2px;
	}

	.content :global(pre code) {
		background: none;
		padding: 0;
	}
</style>
