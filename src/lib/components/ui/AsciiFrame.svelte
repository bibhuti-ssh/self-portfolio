<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, width = 50 }: { children: Snippet; width?: number } = $props();
</script>

<div class="ascii-frame">
	<pre class="frame-border" aria-hidden="true">┌{'─'.repeat(width)}┐</pre>
	<div class="frame-content">
		{@render children()}
	</div>
	<pre class="frame-border" aria-hidden="true">└{'─'.repeat(width)}┘</pre>
</div>

<style>
	.ascii-frame {
		font-family: var(--font-mono);
		display: inline-block;
	}

	.frame-border {
		font-size: 11px;
		line-height: 1.3;
		color: var(--fg-ghost);
		margin: 0;
	}

	.frame-content {
		padding: var(--space-2) var(--space-4);
	}
</style>
