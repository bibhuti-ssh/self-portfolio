<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';

	let { data } = $props();
	const aboutText = $derived(data.settings?.about ?? '');
	const paragraphs = $derived(aboutText.split('\\n\\n').filter(Boolean));
</script>

<svelte:head>
	<title>About — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="title">About</h1>
		<div class="bio">
			{#each paragraphs as p}
				<p>{p}</p>
			{/each}
		</div>
	{:else}
		<h1># About</h1>
		{#each paragraphs as p}
			<p style="color:var(--fg-2)">{p}</p>
		{/each}
	{/if}
</section>

<style>
	.page { padding: var(--space-6) 0; }

	.title {
		font-weight: 700;
		font-size: var(--text-xl);
		margin-bottom: var(--space-4);
	}

	.bio p {
		color: var(--fg-2);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-3);
	}

	@media (max-width: 480px) {
		.page { padding: var(--space-4) 0; }
	}
</style>
