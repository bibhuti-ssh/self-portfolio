<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button
	class="theme-toggle"
	onclick={() => theme.toggle()}
	aria-label="Switch to {theme.isDark ? 'light' : 'dark'} theme"
>
	{theme.isDark ? '░ light' : '█ dark'}
</button>

<style>
	.theme-toggle {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--fg-tertiary);
		padding: var(--space-1) var(--space-2);
		transition: color 120ms ease;
	}

	.theme-toggle:hover {
		color: var(--fg-primary);
	}
</style>
