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
		<h1 class="title">Projects</h1>
		<p class="desc">Things I've built, shipped, or am still thinking about.</p>
	{:else}
		<h1># Projects</h1>
	{/if}
	<AsciiDivider style="thin" />
	{#each data.projects as project}
		<ProjectCard {project} />
	{/each}
</section>

<style>
	.page { padding: var(--space-6) 0; }
	.title { font-weight: 700; font-size: var(--text-xl); margin-bottom: var(--space-1); }
	.desc { color: var(--fg-2); font-size: var(--text-sm); }

	@media (max-width: 480px) { .page { padding: var(--space-4) 0; } }
</style>
