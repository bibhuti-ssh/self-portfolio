<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import AsciiDivider from '$lib/components/ui/AsciiDivider.svelte';
</script>

<svelte:head>
	<title>About — Bibhuti Jha</title>
</svelte:head>

<section class="page">
	{#if mode.isHuman}
		<h1 class="page-title">About</h1>

		<pre class="portrait decorative" aria-hidden="true">
    ┌─────────────────────┐
    │                     │
    │    ╔═══╗            │
    │    ║ ▓ ║  bibhuti   │
    │    ╚═══╝  jha       │
    │                     │
    │    engineer          │
    │    builder           │
    │    reader            │
    │                     │
    └─────────────────────┘</pre>

		<AsciiDivider style="thin" />

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
				Toggle it in the nav.
			</p>
		</div>
	{:else}
		<h1># About</h1>
		<p>> Bibhuti Jha — engineer, builder, reader</p>
		<p>I build systems at the intersection of cloud infrastructure and intelligent automation. I care about code that's honest, fast, and doesn't waste your time.</p>
		<p>When I'm not shipping, I'm reading — mostly systems thinking, distributed computing, and the occasional novel that makes me reconsider everything.</p>
	{/if}
</section>

<style>
	.page {
		padding: var(--space-12) 0;
		max-width: var(--measure-wide);
	}

	.page-title {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-3xl);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-8);
	}

	.portrait {
		font-family: var(--font-mono);
		font-size: 11px;
		line-height: 1.3;
		color: var(--fg-ghost);
		margin-bottom: var(--space-4);
	}

	.bio {
		max-width: var(--measure);
	}

	.bio p {
		font-size: var(--text-md);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-4);
		color: var(--fg-secondary);
	}

	.bio p:first-child::first-letter {
		font-family: var(--font-display);
		font-style: italic;
		font-size: 3.5em;
		float: left;
		line-height: 0.8;
		padding-right: 0.08em;
		color: var(--fg-primary);
	}
</style>
