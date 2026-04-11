<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
	let { style = 'thin' }: { style?: 'thin' | 'double' | 'dots' | 'node' } = $props();

	const p: Record<string, string> = {
		thin:   '────────── · ──────────',
		double: '══════════ ◆ ══════════',
		dots:   '· · · · · · · · · · · ·',
		node:   '○───○───○───○───○───○───○'
	};
</script>

{#if mode.isHuman}
	<div class="d decorative" aria-hidden="true">{p[style]}</div>
{:else}
	<hr class="d-agent" />
{/if}

<style>
	.d {
		font-family: var(--font-ascii);
		font-size: var(--text-xs);
		color: var(--fg-muted);
		margin: var(--space-4) 0;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
	}

	.d-agent {
		border: none;
		border-top: 1px solid var(--border);
		margin: var(--space-3) 0;
	}
</style>
