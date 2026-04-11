<script lang="ts">
	import { theme } from '$lib/stores/theme.svelte';
</script>

<button class="toggle" onclick={() => theme.toggle()} aria-label="Switch to {theme.isDark ? 'light' : 'dark'} theme">
	{theme.isDark ? '◐ light' : '◑ dark'}
</button>

<style>
	.toggle {
		font-size: var(--text-xs);
		color: var(--fg-3);
		transition: color 80ms;
	}
	.toggle:hover { color: var(--fg); }
</style>
