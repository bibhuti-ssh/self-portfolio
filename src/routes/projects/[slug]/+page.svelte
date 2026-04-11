<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.project.title} — Bibhuti Jha</title>
	<meta name="description" content={data.project.description} />
</svelte:head>

<article class="detail">
	{#if mode.isHuman}
		<a href="/projects" class="back">← projects</a>
		<h1 class="title">{data.project.title}</h1>
		<div class="meta">
			<span>{data.project.date}</span>
			<span class:active={data.project.status === 'active'}>[{data.project.status}]</span>
		</div>
		<div class="tags">
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
	{:else}
		<h1># {data.project.title}</h1>
		<p style="color:var(--fg-2)">date: {data.project.date} | status: {data.project.status} | stack: {data.project.techStack.join(', ')}</p>
	{/if}

	<AsciiDivider style="thin" />

	<div class="content">
		<data.project.content />
	</div>
</article>

<style>
	.detail { padding: var(--space-6) 0; }

	.back {
		font-size: var(--text-xs);
		color: var(--fg-3);
		text-decoration: none;
		display: inline-block;
		margin-bottom: var(--space-4);
	}
	.back:hover { color: var(--accent); }

	.title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-2xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-2);
	}

	.meta {
		font-size: var(--text-xs);
		color: var(--fg-3);
		display: flex;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}
	.active { color: var(--accent); }

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1);
		margin-bottom: var(--space-3);
	}

	.tag {
		font-size: var(--text-xs);
		color: var(--fg-3);
		padding: 1px var(--space-2);
		border: 1px solid var(--border);
	}

	.links {
		display: flex;
		gap: var(--space-3);
		font-size: var(--text-xs);
	}
	.links a { color: var(--fg-2); text-decoration: none; }
	.links a:hover { color: var(--accent); }

	.content { line-height: var(--leading-relaxed); }
	.content :global(h2) { font-weight: 700; font-size: var(--text-lg); margin: var(--space-6) 0 var(--space-2); }
	.content :global(p) { margin-bottom: var(--space-3); color: var(--fg-2); }
	.content :global(code) { font-size: var(--text-sm); background: var(--bg-code); padding: 1px 4px; }
	.content :global(pre) { background: var(--bg-code); padding: var(--space-3); overflow-x: auto; margin-bottom: var(--space-3); border: 1px solid var(--border); }
	.content :global(pre code) { background: none; padding: 0; }
</style>
