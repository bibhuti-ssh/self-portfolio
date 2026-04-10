<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';

	type DividerStyle = 'thin' | 'double' | 'dotted' | 'gradient' | 'wave';

	let { style = 'thin' as DividerStyle } = $props();

	const patterns: Record<DividerStyle, string> = {
		thin: '─'.repeat(60),
		double: '═'.repeat(60),
		dotted: '· '.repeat(30),
		gradient: '░▒▓' + '█'.repeat(20) + '▓▒░',
		wave: '░▒▓'.repeat(10) + '▓▒░'
	};
</script>

{#if mode.isHuman}
	<div class="divider decorative" aria-hidden="true">
		<pre>{patterns[style]}</pre>
	</div>
{:else}
	<hr class="divider-agent" />
{/if}

<style>
	.divider {
		overflow: hidden;
		margin: var(--space-8) 0;
	}

	.divider pre {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--fg-ghost);
		line-height: 1;
		white-space: pre;
	}

	.divider-agent {
		border: none;
		border-top: 1px solid var(--border-secondary);
		margin: var(--space-6) 0;
	}
</style>
