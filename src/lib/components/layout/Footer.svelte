<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
</script>

<footer class="footer">
	{#if mode.isHuman}
		<pre class="footer-art decorative" aria-hidden="true">░▒▓ built with svelte & questionable judgment ▓▒░</pre>
	{/if}

	<div class="footer-links">
		<a href="https://github.com/bibhutissh" target="_blank" rel="noopener">github</a>
		<span class="sep">/</span>
		<a href="mailto:hello@bibhutijha.dev">email</a>
		<span class="sep">/</span>
		<a href="/llms.txt">llms.txt</a>
	</div>

	<p class="footer-copy">&copy; {new Date().getFullYear()} bibhuti jha</p>
</footer>

<style>
	.footer {
		margin-top: var(--space-12);
		padding: var(--space-6) 0;
		border-top: 1px solid var(--border-ghost);
		text-align: center;
	}

	.footer-art {
		font-size: var(--text-xs);
		color: var(--fg-ghost);
		margin-bottom: var(--space-4);
	}

	.footer-links {
		font-size: var(--text-sm);
		display: flex;
		justify-content: center;
		gap: var(--space-2);
		margin-bottom: var(--space-3);
	}

	.footer-links a {
		color: var(--fg-secondary);
		text-decoration: none;
	}

	.footer-links a:hover {
		color: var(--accent);
	}

	.sep {
		color: var(--fg-ghost);
	}

	.footer-copy {
		font-size: var(--text-xs);
		color: var(--fg-ghost);
	}
</style>
