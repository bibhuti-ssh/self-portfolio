<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
</script>

<svelte:head>
	<title>About — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="title">About</h1>
		<div class="bio">
			<p>
				I build systems at the intersection of cloud infrastructure and intelligent automation.
				I care about code that's honest, fast, and doesn't waste your time.
			</p>
			<p>
				When I'm not shipping, I'm reading — mostly systems thinking, distributed computing,
				and the occasional novel that makes me reconsider everything.
			</p>
			<p>
				This site runs on SvelteKit, markdown, and stubbornness. It has two modes:
				one for humans who appreciate clean design, and one for AI agents who just want the data.
			</p>
		</div>
	{:else}
		<h1># About</h1>
		<p style="color:var(--fg-2)">I build systems at the intersection of cloud infrastructure and intelligent automation.</p>
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
