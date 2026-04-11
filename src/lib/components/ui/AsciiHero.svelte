<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	import { cycleTaglines } from '$lib/utils/ascii';
	import AsciiTorus from './AsciiTorus.svelte';

	let {
		taglines = ['building things that think', 'shipping at the edge', 'reading the source', 'systems over hype'],
		github = '',
		twitter = '',
		linkedin = ''
	}: { taglines?: string[]; github?: string; twitter?: string; linkedin?: string } = $props();

	let tagline = $state('');
	let visible = $state(false);

	const banner = `██████╗ ██╗██████╗ ██╗  ██╗██╗   ██╗████████╗██╗         ██╗██╗  ██╗ █████╗
██╔══██╗██║██╔══██╗██║  ██║██║   ██║╚══██╔══╝██║         ██║██║  ██║██╔══██╗
██████╔╝██║██████╔╝███████║██║   ██║   ██║   ██║         ██║███████║███████║
██╔══██╗██║██╔══██╗██╔══██║██║   ██║   ██║   ██║    ██   ██║██╔══██║██╔══██║
██████╔╝██║██████╔╝██║  ██║╚██████╔╝   ██║   ██║    ╚█████╔╝██║  ██║██║  ██║
╚═════╝ ╚═╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝     ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝`;

	$effect(() => {
		visible = true;
		const cancel = cycleTaglines(taglines, (text) => { tagline = text; });
		return cancel;
	});
</script>

<section class="hero" aria-label="Introduction">
	{#if mode.isHuman}
		<div class="hero-inner" class:visible>
			<div class="hero-row">
				<div class="hero-text">
					<pre class="banner decorative" aria-hidden="true">{banner}</pre>
					<p class="role">engineer · builder · reader</p>
					<div class="socials">
						{#if github}<a href={github} target="_blank" rel="noopener">github</a>{/if}
						{#if linkedin}<a href={linkedin} target="_blank" rel="noopener">linkedin</a>{/if}
						{#if twitter}<a href={twitter} target="_blank" rel="noopener">x/twitter</a>{/if}
					</div>
					<p class="tagline">
						<span class="prompt" aria-hidden="true">&gt;</span>
						<span class="tagline-text">{tagline}</span>
						<span class="cursor" aria-hidden="true">_</span>
					</p>
				</div>
				<div class="torus-wrap">
					<AsciiTorus width={40} height={20} speed={1} />
				</div>
			</div>
		</div>
	{:else}
		<h1># Bibhuti Jha</h1>
		<p style="color: var(--fg-2)">> engineer / builder / reader</p>
	{/if}
</section>

<style>
	.hero {
		padding: var(--space-12) 0 var(--space-6);
	}

	.hero-inner {
		opacity: 0;
		transition: opacity 500ms ease;
	}
	.hero-inner.visible { opacity: 1; }

	.hero-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
	}

	.hero-text {
		flex: 1;
		min-width: 0;
	}

	.torus-wrap {
		flex-shrink: 0;
	}

	.banner {
		font-family: var(--font-ascii);
		font-size: 0.55rem;
		line-height: 1.15;
		color: var(--fg);
		margin-bottom: var(--space-3);
		overflow: hidden;
		white-space: pre;
	}

	.role {
		font-size: var(--text-lg);
		color: var(--fg-3);
	}

	.socials {
		display: flex;
		gap: var(--space-3);
		margin-top: var(--space-2);
		font-size: var(--text-sm);
	}

	.socials a {
		color: var(--fg-3);
		text-decoration: none;
		transition: color 80ms;
	}
	.socials a:hover { color: var(--accent); }

	.tagline {
		font-size: var(--text-lg);
		color: var(--fg-muted);
		margin-top: var(--space-3);
		display: flex;
		gap: var(--space-1);
	}

	.prompt { color: var(--fg-muted); }
	.tagline-text { min-width: 12ch; }
	.cursor { color: var(--accent); animation: blink 1.06s step-end infinite; }

	@media (max-width: 480px) {
		.hero { padding: var(--space-8) 0 var(--space-4); }
		.banner { font-size: 0.35rem; }
		.torus-wrap { display: none; }
	}
</style>
