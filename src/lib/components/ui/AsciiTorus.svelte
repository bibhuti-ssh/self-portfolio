<script lang="ts">
	let {
		width = 50,
		height = 24,
		speed = 1
	}: { width?: number; height?: number; speed?: number } = $props();

	let frame = $state('');

	// 16-level density ramp for richer shading
	const chars = ' .,:;~=+*#%$@@@@';
	const R1 = 1;
	const R2 = 2;
	const K2 = 5;
	const TAU = 6.283185;

	function render(A: number, B: number): string {
		const K1 = (width * K2 * 3) / (8 * (R1 + R2));
		const output = new Array(width * height).fill(' ');
		const zbuf = new Float64Array(width * height);

		const sinA = Math.sin(A), cosA = Math.cos(A);
		const sinB = Math.sin(B), cosB = Math.cos(B);

		// Denser sampling: 0.04 and 0.01 (was 0.07 and 0.02)
		for (let j = 0; j < TAU; j += 0.04) {
			const sinj = Math.sin(j), cosj = Math.cos(j);

			for (let i = 0; i < TAU; i += 0.01) {
				const sini = Math.sin(i), cosi = Math.cos(i);

				const h = cosj + R2;
				const D = 1 / (sini * h * sinA + sinj * cosA + K2);
				const t = sini * h * cosA - sinj * sinA;

				const x = Math.floor(width / 2 + K1 * D * (cosi * h * cosB - t * sinB));
				const y = Math.floor(height / 2 + (K1 / 1.8) * D * (cosi * h * sinB + t * cosB));

				// Luminance: surface normal · light direction
				const L =
					cosj * sini * sinB -
					cosi * sinj * sinA -
					sini * sinj * cosA +
					cosj * cosA * cosB +
					cosi * cosj * sinA;

				const idx = x + width * y;

				if (y >= 0 && y < height && x >= 0 && x < width && D > zbuf[idx]) {
					zbuf[idx] = D;
					// Map luminance to wider character range
					const li = Math.max(0, Math.min(chars.length - 1, Math.floor(L * 10)));
					output[idx] = chars[li];
				}
			}
		}

		const lines: string[] = [];
		for (let row = 0; row < height; row++) {
			lines.push(output.slice(row * width, (row + 1) * width).join(''));
		}
		return lines.join('\n');
	}

	$effect(() => {
		let A = 0;
		let B = 0;
		let raf: number;
		let running = true;

		function tick() {
			if (!running) return;
			frame = render(A, B);
			A += 0.025 * speed;
			B += 0.012 * speed;
			raf = requestAnimationFrame(tick);
		}

		raf = requestAnimationFrame(tick);

		return () => {
			running = false;
			cancelAnimationFrame(raf);
		};
	});
</script>

<pre class="torus decorative" aria-hidden="true">{frame}</pre>

<style>
	.torus {
		font-family: var(--font-ascii);
		font-size: var(--text-xs);
		line-height: 1.05;
		color: var(--fg-muted);
		user-select: none;
		margin: 0;
	}
</style>
