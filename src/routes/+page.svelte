<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import { page } from '$app/state';
	import AsciiHero from '$lib/components/ui/AsciiHero.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import BookCard from '$lib/components/ui/BookCard.svelte';

	let { data } = $props();
	const settings = $derived(data.settings);
</script>

<svelte:head>
	<title>Bibhuti Jha</title>
	<meta name="description" content="Bibhuti Jha — engineer, builder, reader" />
</svelte:head>

<AsciiHero taglines={settings?.taglines} github={settings?.github} linkedin={settings?.linkedin} twitter={settings?.twitter} />

<!-- Bio -->
<section class="section bio">
	<p class="bio-text">{settings?.bio ?? ''}</p>
</section>

<!-- Experience -->
<section class="section">
	<a href="/experience" class="heading-link">
		<h2 class="heading">{mode.isAgent ? '## Experience' : 'Experience'}</h2>
	</a>
	<div class="exp-list">
		{#each data.experience as exp}
			<div class="exp-item">
				<div class="exp-top">
					<span class="exp-role">{exp.role}</span>
					<span class="exp-date">{exp.date}</span>
				</div>
				<span class="exp-company">{exp.company}</span>
				<p class="exp-desc">{exp.description}</p>
			</div>
		{/each}
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

	{#if settings?.building_in_public}
		<div class="bip">
			<p class="bip-text">{settings.building_in_public}</p>
		</div>
	{/if}

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

	.bio { border-bottom: 1px solid var(--border); }
	.bio-text {
		color: var(--fg-2);
		line-height: var(--leading-relaxed);
		max-width: 60ch;
	}

	.exp-list { display: flex; flex-direction: column; }

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

	.exp-role { font-weight: 700; font-size: var(--text-md); }
	.exp-date { font-size: var(--text-xs); color: var(--fg-3); flex-shrink: 0; }
	.exp-company { font-size: var(--text-sm); color: var(--fg-3); }

	.exp-desc {
		color: var(--fg-2);
		margin-top: var(--space-1);
		line-height: var(--leading-normal);
	}

	.more {
		display: inline-block;
		font-size: var(--text-xs);
		color: var(--fg-3);
		text-decoration: none;
		margin-top: var(--space-3);
	}
	.more:hover { color: var(--accent); }

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

	.post-row time { font-size: var(--text-xs); color: var(--fg-3); flex-shrink: 0; }

	.post-title {
		font-weight: 700;
		transition: color 80ms;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

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

	@media (max-width: 480px) {
		.section { padding: var(--space-4) 0; }
		.exp-top { flex-direction: column; gap: 0; }
	}
</style>
