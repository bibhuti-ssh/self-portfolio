<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, width = 30 }: { children: Snippet; width?: number } = $props();
	const w = Math.min(width, 40);
</script>

<div class="ascii-frame">
	<pre class="frame-border" aria-hidden="true">┌{'─'.repeat(w)}┐</pre>
	<div class="frame-content">
		{@render children()}
	</div>
	<pre class="frame-border" aria-hidden="true">└{'─'.repeat(w)}┘</pre>
</div>

<style>
	.ascii-frame {
		font-family: var(--font-mono);
		display: inline-block;
		max-width: 100%;
		overflow: hidden;
	}

	.frame-border {
		font-size: var(--text-xs);
		line-height: 1.3;
		color: var(--fg-ghost);
		margin: 0;
		overflow: hidden;
	}

	.frame-content {
		padding: var(--space-2) var(--space-3);
	}
</style>
