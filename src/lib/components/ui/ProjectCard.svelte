<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import type { Project } from '$lib/types/content';

	let { project }: { project: Project } = $props();
</script>

{#if mode.isAgent}
	<div class="agent">
		<p>## {project.title}</p>
		<p>{project.description}</p>
		<p>stack: {project.techStack.join(', ')} | status: {project.status}</p>
	</div>
{:else}
	<a href="/projects/{project.slug}" class="card">
		<div class="row">
			<h3 class="title">{project.title}</h3>
			<span class="year">{project.date.slice(0, 4)}</span>
		</div>
		<p class="desc">{project.description}</p>
		<div class="row">
			<span class="tech">{project.techStack.join(' · ')}</span>
			<span class="status" class:active={project.status === 'active'}>{project.status}</span>
		</div>
	</a>
{/if}

<style>
	.card {
		display: block;
		text-decoration: none;
		color: inherit;
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border);
	}
	.card:hover .title { color: var(--accent); }

	.row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-2);
	}

	.title {
		font-weight: 400;
		font-size: var(--text-md);
		transition: color 80ms;
		min-width: 0;
	}

	.year {
		font-size: var(--text-xs);
		color: var(--fg-muted);
		flex-shrink: 0;
	}

	.desc {
		color: var(--fg-2);
		margin: var(--space-1) 0 var(--space-2);
		line-height: var(--leading-normal);
	}

	.tech {
		font-size: var(--text-xs);
		color: var(--fg-3);
		text-transform: uppercase;
		letter-spacing: 0.03em;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.status {
		font-size: var(--text-xs);
		color: var(--fg-muted);
		flex-shrink: 0;
	}
	.status.active { color: var(--accent); }

	.agent {
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border);
	}
	.agent p { color: var(--fg-2); }
	.agent p:first-child { color: var(--fg); font-weight: 700; }
</style>
