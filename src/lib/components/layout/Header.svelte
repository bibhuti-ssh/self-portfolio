<script lang="ts">
	import { page } from '$app/state';
	import ModeToggle from '$lib/components/ui/ModeToggle.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	const links = [
		{ href: '/', label: 'index' },
		{ href: '/projects', label: 'projects' },
		{ href: '/timeline', label: 'life' },
		{ href: '/readings', label: 'reading' },
		{ href: '/wordings', label: 'wordings' },
		{ href: '/about', label: 'about' }
	];

	let scrolled = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	$effect(() => {
		if (typeof window === 'undefined') return;

		function onScroll() {
			scrolled = window.scrollY > 80;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<nav class="nav" class:scrolled aria-label="Main navigation">
	<div class="nav-left">
		<span class="nav-prompt" aria-hidden="true">~/bibhuti</span>
		<span class="nav-sep" aria-hidden="true">$</span>
	</div>

	<ul class="nav-links">
		{#each links as link}
			<li>
				<a href={link.href} class:active={isActive(link.href)}>
					<span class="link-marker" aria-hidden="true">{isActive(link.href) ? '[x]' : '[ ]'}</span>
					{link.label}
				</a>
			</li>
		{/each}
	</ul>

	<div class="nav-right">
		<ThemeToggle />
		<ModeToggle />
	</div>
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: var(--space-4);
		height: 56px;
		padding: 0 var(--space-4);
		margin: 0 calc(-1 * var(--space-8));
		padding-inline: var(--space-8);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		transition: background 200ms ease, border-color 200ms ease;
		border-bottom: 1px solid transparent;
	}

	.nav.scrolled {
		background: color-mix(in srgb, var(--bg-primary) 85%, transparent);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		border-bottom-color: var(--border-ghost);
	}

	.nav-left {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	.nav-prompt {
		color: var(--fg-tertiary);
	}

	.nav-sep {
		color: var(--fg-ghost);
	}

	.nav-links {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
	}

	.nav-links a {
		color: var(--fg-secondary);
		text-decoration: none;
		transition: color 120ms ease;
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.nav-links a:hover {
		color: var(--fg-primary);
	}

	.nav-links a.active {
		color: var(--fg-primary);
	}

	.link-marker {
		font-size: var(--text-xs);
		color: var(--fg-ghost);
	}

	.active .link-marker {
		color: var(--accent);
	}

	.nav-right {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: var(--space-2);
		flex-shrink: 0;
	}

	@media (max-width: 768px) {
		.nav {
			flex-wrap: wrap;
			height: auto;
			padding-block: var(--space-3);
			gap: var(--space-2);
		}

		.nav-prompt, .nav-sep {
			display: none;
		}

		.nav-links {
			order: 3;
			width: 100%;
			gap: var(--space-2);
		}

		.link-marker {
			display: none;
		}
	}
</style>
