<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
</script>

<button class="toggle" onclick={() => mode.toggle()} aria-label="Switch to {mode.isAgent ? 'human' : 'agent'} mode">
	{mode.isAgent ? '[human]' : '[agent]'}
</button>

<style>
	.toggle {
		font-size: var(--text-xs);
		color: var(--fg-3);
		transition: color 80ms;
	}
	.toggle:hover { color: var(--accent); }
</style>
