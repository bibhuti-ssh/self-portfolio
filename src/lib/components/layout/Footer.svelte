<script lang="ts">
	import { mode } from '$lib/stores/mode.svelte';
</script>

<footer class="footer">
	<div class="links">
		<a href="https://github.com/bibhutissh" target="_blank" rel="noopener">github</a>
		<span>·</span>
		<a href="mailto:hello@bibhutijha.dev">email</a>
		<span>·</span>
		<a href="/llms.txt">llms.txt</a>
	</div>
	<p class="copy">&copy; {new Date().getFullYear()} bibhuti jha</p>
</footer>

<style>
	.footer {
		margin-top: var(--space-8);
		padding: var(--space-6) 0 var(--space-4);
		border-top: 1px solid var(--border);
		text-align: center;
		font-size: var(--text-xs);
		color: var(--fg-muted);
	}

	.links {
		display: flex;
		justify-content: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	.links a {
		color: var(--fg-3);
		text-decoration: none;
	}
	.links a:hover { color: var(--accent); }
	.links span { color: var(--fg-muted); }
</style>
