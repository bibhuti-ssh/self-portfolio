<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiHero from '$lib/components/ui/AsciiHero.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import BookCard from '$lib/components/ui/BookCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Bibhuti Jha</title>
	<meta name="description" content="Bibhuti Jha — engineer, builder, reader" />
</svelte:head>

<AsciiHero />

<!-- Featured Projects -->
<section class="section">
	<h2 class="section-title">
		{mode.isAgent ? '## Projects' : 'Projects'}
	</h2>

	<div class="list">
		{#each data.projects as project}
			<ProjectCard {project} />
		{/each}
	</div>

	<a href="/projects" class="section-link">→ all projects</a>
</section>

<!-- Recent Readings -->
<section class="section">
	<h2 class="section-title">
		{mode.isAgent ? '## Reading' : 'Reading'}
	</h2>

	{#if mode.isHuman}
		<div class="reading-header" aria-hidden="true">
			<span></span>
			<span>title</span>
			<span>author</span>
			<span>rating</span>
		</div>
	{/if}

	{#each data.readings as reading}
		<BookCard {reading} />
	{/each}

	<a href="/readings" class="section-link">→ all readings</a>
</section>

<!-- Recent Writing -->
<section class="section">
	<h2 class="section-title">
		{mode.isAgent ? '## Writing' : 'Recent Writing'}
	</h2>

	<div class="list">
		{#each data.wordings as post}
			<a href="/wordings/{post.slug}" class="post-row">
				<time>{post.date}</time>
				<span class="post-title">{post.title}</span>
			</a>
		{/each}
	</div>

	<a href="/wordings" class="section-link">→ all writing</a>
</section>

<style>
	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--border-ghost);
	}

	.section-title {
		font-weight: 700;
		font-size: var(--text-lg);
		margin-bottom: var(--space-4);
		letter-spacing: -0.01em;
	}

	.section-link {
		display: inline-block;
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		text-decoration: none;
		margin-top: var(--space-3);
		transition: color 100ms ease;
	}

	.section-link:hover {
		color: var(--accent);
	}

	.list {
		display: flex;
		flex-direction: column;
	}

	.reading-header {
		display: grid;
		grid-template-columns: 2ch 1fr auto auto;
		gap: var(--space-3);
		padding: var(--space-1) var(--space-3);
		font-size: var(--text-xs);
		color: var(--fg-ghost);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		border-bottom: 1px solid var(--border-ghost);
		margin-bottom: var(--space-1);
	}

	.post-row {
		display: flex;
		align-items: baseline;
		gap: var(--space-4);
		padding: var(--space-2) 0;
		text-decoration: none;
		color: var(--fg-primary);
		border-bottom: 1px solid var(--border-ghost);
		transition: background 100ms ease;
	}

	.post-row:hover {
		background: var(--bg-secondary);
		margin-inline: calc(-1 * var(--space-3));
		padding-inline: var(--space-3);
	}

	.post-row:hover .post-title {
		color: var(--accent);
	}

	.post-row time {
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		flex-shrink: 0;
	}

	.post-title {
		font-weight: 700;
		transition: color 100ms ease;
	}
</style>
