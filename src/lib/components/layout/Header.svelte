<script lang="ts">
	import { page } from '$app/state';
	import ModeToggle from '$lib/components/ui/ModeToggle.svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	const links = [
		{ href: '/', label: 'index' },
		{ href: '/experience', label: 'experience' },
		{ href: '/projects', label: 'projects' },
		{ href: '/readings', label: 'reading' },
		{ href: '/wordings', label: 'writing' },
		{ href: '/about', label: 'about' }
	];

	let scrolled = $state(false);
	let menuOpen = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		const onScroll = () => { scrolled = window.scrollY > 20; };
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => { page.url.pathname; menuOpen = false; });
</script>

<header class="header" class:scrolled>
	<nav class="nav">
		<a href="/" class="logo">bj</a>

		<div class="links">
			{#each links as link}
				<a href={link.href} class:active={isActive(link.href)}>{link.label}</a>
			{/each}
		</div>

		<div class="actions">
			<ThemeToggle />
			<ModeToggle />
		</div>

		<button class="burger" onclick={() => (menuOpen = !menuOpen)} aria-label="Menu">
			{menuOpen ? '×' : '≡'}
		</button>
	</nav>
</header>

{#if menuOpen}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="overlay" onclick={() => (menuOpen = false)} onkeydown={() => {}}></div>
	<div class="drawer">
		{#each links as link}
			<a href={link.href} class="drawer-link" class:active={isActive(link.href)}>{link.label}</a>
		{/each}
		<div class="drawer-foot">
			<ThemeToggle />
			<ModeToggle />
		</div>
	</div>
{/if}

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 100;
		margin: 0 calc(-1 * var(--space-6));
		padding: 0 var(--space-6);
		border-bottom: 1px solid transparent;
		transition: background 150ms, border-color 150ms;
	}

	.header.scrolled {
		background: color-mix(in srgb, var(--bg) 90%, transparent);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom-color: var(--border);
	}

	.nav {
		display: flex;
		align-items: center;
		height: 44px;
		gap: var(--space-4);
		font-size: var(--text-xs);
	}

	.logo {
		font-weight: 700;
		font-size: var(--text-sm);
		color: var(--fg);
		text-decoration: none;
		flex-shrink: 0;
	}

	.links {
		display: flex;
		gap: var(--space-3);
	}

	.links a {
		color: var(--fg-3);
		text-decoration: none;
		transition: color 80ms;
	}
	.links a:hover { color: var(--fg); }
	.links a.active { color: var(--fg); }

	.actions {
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.burger {
		display: none;
		margin-left: auto;
		font-size: var(--text-lg);
		color: var(--fg-3);
		padding: var(--space-1);
	}
	.burger:hover { color: var(--fg); }

	.overlay {
		position: fixed;
		inset: 0;
		z-index: 90;
		background: rgba(0,0,0,0.3);
	}

	.drawer {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 91;
		width: 200px;
		height: 100dvh;
		background: var(--bg);
		border-left: 1px solid var(--border);
		padding: var(--space-8) var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		font-size: var(--text-sm);
	}

	.drawer-link {
		color: var(--fg-3);
		text-decoration: none;
		padding: var(--space-2) 0;
		border-bottom: 1px solid var(--border);
		transition: color 80ms;
	}
	.drawer-link:hover, .drawer-link.active { color: var(--fg); }

	.drawer-foot {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border);
	}

	@media (max-width: 600px) {
		.header {
			margin: 0 calc(-1 * var(--space-4));
			padding: 0 var(--space-4);
		}

		.links, .actions { display: none; }
		.burger { display: block; }
	}
</style>
