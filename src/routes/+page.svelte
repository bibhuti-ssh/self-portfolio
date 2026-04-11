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

<!-- About one-liner -->
<section class="section bio">
	<p class="bio-text">
		I build systems at the intersection of cloud infrastructure and intelligent automation.
		Currently shipping DroidRun Cloud — AI agents that control real Android devices.
		I care about code that's honest, fast, and doesn't waste your time.
	</p>
</section>

<!-- Experience -->
<section class="section">
	<a href="/experience" class="heading-link">
		<h2 class="heading">{mode.isAgent ? '## Experience' : 'Experience'}</h2>
	</a>
	<div class="exp-list">
		<div class="exp-item">
			<div class="exp-top">
				<span class="exp-role">Founding Engineer</span>
				<span class="exp-date">2025 — present</span>
			</div>
			<span class="exp-company">DroidRun</span>
			<p class="exp-desc">Building cloud platform for AI-powered mobile device automation. SvelteKit, Python, FastAPI.</p>
		</div>
		<div class="exp-item">
			<div class="exp-top">
				<span class="exp-role">Open Source Contributor</span>
				<span class="exp-date">2024 — present</span>
			</div>
			<span class="exp-company">LLM Agent Tooling</span>
			<p class="exp-desc">Contributing to orchestration frameworks for LLM-powered agents.</p>
		</div>
	</div>
</section>

<!-- Projects -->
<section class="section">
	<a href="/projects" class="heading-link">
		<h2 class="heading">{mode.isAgent ? '## Projects' : 'Projects'}</h2>
	</a>
	{#each data.projects as project}
		<ProjectCard {project} />
	{/each}
	<a href="/projects" class="more">→ all projects</a>
</section>

<!-- Writing & Building in Public -->
<section class="section">
	<a href="/wordings" class="heading-link">
		<h2 class="heading">{mode.isAgent ? '## Writing' : 'Writing & Building in Public'}</h2>
	</a>

	{#each data.wordings as post}
		<a href="/wordings/{post.slug}" class="post-row">
			<time>{post.date}</time>
			<span class="post-title">{post.title}</span>
		</a>
	{/each}

	<div class="bip">
		<p class="bip-text">
			I build in the open — shipping features, sharing learnings, breaking things.
			Follow the build on <a href="https://x.com/bibhutissh" target="_blank" rel="noopener">X</a>
			or check the code on <a href="https://github.com/bibhutissh" target="_blank" rel="noopener">GitHub</a>.
		</p>
	</div>

	<a href="/wordings" class="more">→ all writing</a>
</section>

<!-- Reading -->
<section class="section">
	<a href="/readings" class="heading-link">
		<h2 class="heading">{mode.isAgent ? '## Reading' : 'Reading'}</h2>
	</a>
	{#each data.readings as reading}
		<BookCard {reading} />
	{/each}
	<a href="/readings" class="more">→ all readings</a>
</section>

<style>
	.section {
		padding: var(--space-6) 0;
		border-bottom: 1px solid var(--border);
	}

	.heading-link {
		text-decoration: none;
		color: inherit;
		display: block;
	}
	.heading-link:hover .heading { color: var(--accent); }

	.heading {
		font-family: var(--font-ascii);
		font-weight: 400;
		font-size: var(--text-xl);
		margin-bottom: var(--space-3);
		color: var(--fg);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		transition: color 80ms;
	}

	/* Bio */
	.bio { border-bottom: 1px solid var(--border); }

	.bio-text {
		color: var(--fg-2);
		line-height: var(--leading-relaxed);
		max-width: 60ch;
	}

	/* Experience */
	.exp-list {
		display: flex;
		flex-direction: column;
	}

	.exp-item {
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border);
	}

	.exp-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-2);
	}

	.exp-role {
		font-weight: 700;
		font-size: var(--text-md);
	}

	.exp-date {
		font-size: var(--text-xs);
		color: var(--fg-3);
		flex-shrink: 0;
	}

	.exp-company {
		font-size: var(--text-sm);
		color: var(--fg-3);
	}

	.exp-desc {
		color: var(--fg-2);
		margin-top: var(--space-1);
		line-height: var(--leading-normal);
	}

	/* More link */
	.more {
		display: inline-block;
		font-size: var(--text-xs);
		color: var(--fg-3);
		text-decoration: none;
		margin-top: var(--space-3);
	}
	.more:hover { color: var(--accent); }

	/* Writing rows */
	.post-row {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		padding: var(--space-2) 0;
		text-decoration: none;
		color: inherit;
		border-bottom: 1px solid var(--border);
	}
	.post-row:hover .post-title { color: var(--accent); }

	.post-row time {
		font-size: var(--text-xs);
		color: var(--fg-3);
		flex-shrink: 0;
	}

	.post-title {
		font-weight: 700;
		transition: color 80ms;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	/* Building in public */
	.bip {
		margin-top: var(--space-4);
		padding: var(--space-3);
		border: 1px dashed var(--border);
	}

	.bip-text {
		color: var(--fg-2);
		line-height: var(--leading-normal);
		font-size: var(--text-sm);
	}

	.bip-text a {
		color: var(--fg);
		text-decoration: underline;
		text-decoration-color: var(--border);
	}
	.bip-text a:hover {
		color: var(--accent);
		text-decoration-color: var(--accent);
	}

	@media (max-width: 480px) {
		.section { padding: var(--space-4) 0; }
		.exp-top { flex-direction: column; gap: 0; }
	}
</style>
