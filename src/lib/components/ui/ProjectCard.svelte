<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import type { Project } from '$lib/types/content';

	let { project }: { project: Project } = $props();
</script>

{#if mode.isAgent}
	<article class="agent-card">
		<h3>## {project.title}</h3>
		<p>{project.description}</p>
		<p>stack: {project.techStack.join(', ')}</p>
		<p>status: {project.status}</p>
		{#if project.url}<p>url: <a href={project.url}>{project.url}</a></p>{/if}
		{#if project.repo}<p>repo: <a href={project.repo}>{project.repo}</a></p>{/if}
	</article>
{:else}
	<a href="/projects/{project.slug}" class="project-card">
		<div class="card-header">
			<h3 class="card-title">{project.title}</h3>
			<span class="card-status" class:active={project.status === 'active'}>
				[{project.status}]
			</span>
		</div>

		<p class="card-desc">{project.description}</p>

		<div class="card-meta">
			<span class="card-tech">{project.techStack.join(' · ')}</span>
			<span class="card-date">{project.date.slice(0, 4)}</span>
		</div>
	</a>
{/if}

<style>
	.project-card {
		display: block;
		text-decoration: none;
		color: var(--fg-primary);
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--border-ghost);
		transition: background 100ms ease;
	}

	.project-card:hover {
		background: var(--bg-secondary);
		margin-inline: calc(-1 * var(--space-3));
		padding-inline: var(--space-3);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-3);
		margin-bottom: var(--space-1);
	}

	.card-title {
		font-weight: 700;
		font-size: var(--text-md);
		transition: color 100ms ease;
	}

	.project-card:hover .card-title {
		color: var(--accent);
	}

	.card-status {
		font-size: var(--text-xs);
		color: var(--fg-ghost);
		flex-shrink: 0;
	}

	.card-status.active {
		color: var(--accent);
	}

	.card-desc {
		color: var(--fg-secondary);
		margin-bottom: var(--space-2);
		line-height: var(--leading-normal);
	}

	.card-meta {
		display: flex;
		justify-content: space-between;
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
	}

	.card-tech {
		text-transform: uppercase;
		letter-spacing: 0.03em;
	}

	.agent-card {
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border-ghost);
	}

	.agent-card h3 {
		margin-bottom: var(--space-1);
	}

	.agent-card p {
		color: var(--fg-secondary);
		margin-bottom: var(--space-1);
	}
</style>
