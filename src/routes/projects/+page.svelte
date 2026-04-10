<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Projects — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="page-title">Projects</h1>
		<p class="page-desc">Things I've built, shipped, or am still thinking about.</p>
	{:else}
		<h1># Projects</h1>
	{/if}

	<AsciiDivider style="thin" />

	<div class="project-list">
		{#each data.projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<style>
	.page {
		padding: var(--space-12) 0;
	}

	.page-title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-3);
	}

	.page-desc {
		color: var(--fg-secondary);
		font-size: var(--text-md);
		margin-bottom: var(--space-2);
	}

	.project-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}
</style>
