<script lang="ts">
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	let active = $state(false);
	let enabled = $state(false);
	let interactive = $state(false);
	let pressing = $state(false);

	let targetX = 0;
	let targetY = 0;
	let frame = 0;

	function isInteractive(target: EventTarget | null) {
		return target instanceof Element && Boolean(
			target.closest('a, button, input, textarea, select, summary, [role="button"], [data-cursor="interactive"]')
		);
	}

	onMount(() => {
		const pointerQuery = window.matchMedia('(pointer: fine)');
		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

		const updateEnabled = () => {
			enabled = pointerQuery.matches && !motionQuery.matches;
			document.documentElement.classList.toggle('has-orbit-cursor', enabled);
		};

		const move = (event: PointerEvent) => {
			if (!enabled || event.pointerType === 'touch') return;
			targetX = event.clientX;
			targetY = event.clientY;
			active = true;
			interactive = isInteractive(event.target);
		};

		const leave = () => {
			active = false;
			pressing = false;
		};

		const down = () => {
			pressing = true;
		};

		const up = () => {
			pressing = false;
		};

		const tick = () => {
			x += (targetX - x) * 0.22;
			y += (targetY - y) * 0.22;
			frame = requestAnimationFrame(tick);
		};

		targetX = window.innerWidth / 2;
		targetY = window.innerHeight / 2;
		x = targetX;
		y = targetY;

		updateEnabled();
		tick();

		pointerQuery.addEventListener('change', updateEnabled);
		motionQuery.addEventListener('change', updateEnabled);
		window.addEventListener('pointermove', move);
		window.addEventListener('pointerleave', leave);
		window.addEventListener('pointerdown', down);
		window.addEventListener('pointerup', up);
		window.addEventListener('blur', leave);

		return () => {
			cancelAnimationFrame(frame);
			document.documentElement.classList.remove('has-orbit-cursor');
			pointerQuery.removeEventListener('change', updateEnabled);
			motionQuery.removeEventListener('change', updateEnabled);
			window.removeEventListener('pointermove', move);
			window.removeEventListener('pointerleave', leave);
			window.removeEventListener('pointerdown', down);
			window.removeEventListener('pointerup', up);
			window.removeEventListener('blur', leave);
		};
	});
</script>

{#if enabled}
	<div
		class:active
		class:interactive
		class:pressing
		class="orbit-cursor"
		style:--cursor-x={`${x}px`}
		style:--cursor-y={`${y}px`}
		aria-hidden="true"
	>
		<span class="cursor-core"></span>
		<span class="cursor-orbit"></span>
	</div>
{/if}

<style>
	.orbit-cursor {
		--cursor-size: 1.45rem;
		position: fixed;
		left: var(--cursor-x);
		top: var(--cursor-y);
		z-index: 9999;
		width: var(--cursor-size);
		height: var(--cursor-size);
		pointer-events: none;
		opacity: 0;
		transform: translate3d(-50%, -50%, 0) scale(0.72);
		transition:
			opacity 180ms ease,
			transform 180ms ease;
		mix-blend-mode: difference;
	}

	.orbit-cursor.active {
		opacity: 1;
		transform: translate3d(-50%, -50%, 0) scale(1);
	}

	.cursor-core,
	.cursor-orbit {
		position: absolute;
		inset: 0;
		border-radius: 999px;
	}

	.cursor-core {
		border: 1px solid color-mix(in srgb, var(--fg) 58%, transparent);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--bg) 18%, transparent);
		transition:
			border-color 160ms ease,
			transform 160ms ease;
	}

	.cursor-core::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0.22rem;
		height: 0.22rem;
		border-radius: 999px;
		background: var(--fg);
		transform: translate(-50%, -50%);
	}

	.cursor-orbit {
		animation: cursor-orbit 1.35s linear infinite;
	}

	.cursor-orbit::before {
		content: '';
		position: absolute;
		left: 50%;
		top: -0.08rem;
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--bg) 72%, transparent);
		transform: translateX(-50%);
	}

	.orbit-cursor.interactive {
		--cursor-size: 1.9rem;
	}

	.orbit-cursor.interactive .cursor-core {
		border-color: var(--accent);
		transform: scale(1.04);
	}

	.orbit-cursor.pressing .cursor-core {
		transform: scale(0.82);
	}

	.orbit-cursor.pressing .cursor-orbit {
		animation-duration: 680ms;
	}

	@keyframes cursor-orbit {
		to {
			transform: rotate(360deg);
		}
	}
</style>
