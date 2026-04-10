<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
</script>

<button
	class="mode-toggle"
	onclick={() => mode.toggle()}
	aria-label="Toggle view mode to {mode.isAgent ? 'human' : 'agent'}"
>
	<span class="prompt">$</span>
	{#if mode.isAgent}
		<span class="cmd">render</span> <span class="flag">--mode=human</span>
	{:else}
		<span class="cmd">render</span> <span class="flag">--mode=agent</span>
	{/if}
</button>

<style>
	.mode-toggle {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		padding: var(--space-1) var(--space-3);
		border: 1px solid var(--border-ghost);
		border-radius: 2px;
		transition: border-color 120ms ease, background 120ms ease;
		white-space: nowrap;
	}

	.mode-toggle:hover {
		border-color: var(--accent);
		background: var(--accent-muted);
	}

	.prompt {
		color: var(--accent);
		margin-right: var(--space-1);
	}

	.cmd {
		color: var(--fg-primary);
	}

	.flag {
		color: var(--fg-tertiary);
	}
</style>
