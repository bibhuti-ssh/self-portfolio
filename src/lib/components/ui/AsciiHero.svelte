<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import { cycleTaglines } from '$lib/utils/ascii';

	let tagline = $state('');
	let visible = $state(false);

	const taglines = [
		'building things that think',
		'shipping at the edge',
		'reading the source',
		'systems over hype'
	];

	$effect(() => {
		visible = true;
		const cancel = cycleTaglines(taglines, (text) => {
			tagline = text;
		});
		return cancel;
	});
</script>

<section class="hero" aria-label="Introduction">
	{#if mode.isHuman}
		<div class="hero-content" class:visible>
			<pre class="hero-ascii decorative" aria-hidden="true">░▒▓█████▓▒░</pre>
			<h1 class="hero-name">Bibhuti Jha</h1>
			<p class="hero-role">engineer · builder · reader</p>
			<p class="hero-tagline">
				<span class="prompt" aria-hidden="true">&gt;</span>
				<span>{tagline}</span>
				<span class="cursor" aria-hidden="true">_</span>
			</p>
		</div>
	{:else}
		<div class="hero-agent">
			<h1># Bibhuti Jha</h1>
			<p>> engineer / builder / reader</p>
		</div>
	{/if}
</section>

<style>
	.hero {
		padding: var(--space-12) 0 var(--space-8);
		border-bottom: 1px solid var(--border-ghost);
	}

	.hero-content {
		opacity: 0;
		transition: opacity 600ms ease;
	}

	.hero-content.visible {
		opacity: 1;
	}

	.hero-ascii {
		font-size: var(--text-sm);
		color: var(--fg-ghost);
		margin-bottom: var(--space-3);
		letter-spacing: 0.1em;
	}

	.hero-name {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--text-4xl);
		line-height: var(--leading-tight);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-2);
	}

	.hero-role {
		font-size: var(--text-md);
		color: var(--fg-secondary);
		margin-bottom: var(--space-4);
	}

	.hero-tagline {
		font-size: var(--text-base);
		color: var(--fg-tertiary);
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.prompt {
		color: var(--fg-ghost);
	}

	.cursor {
		color: var(--accent);
		animation: blink 1.06s step-end infinite;
	}

	.hero-agent h1 {
		font-size: var(--text-lg);
		margin-bottom: var(--space-2);
	}

	.hero-agent p {
		color: var(--fg-secondary);
	}

	@media (max-width: 640px) {
		.hero {
			padding: var(--space-8) 0 var(--space-6);
		}

		.hero-name {
			font-size: var(--text-2xl);
		}
	}
</style>
