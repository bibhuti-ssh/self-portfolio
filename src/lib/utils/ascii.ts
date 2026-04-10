/**
 * Typewriter effect: returns characters one by one via a callback
 */
export function typewriter(
	text: string,
	onChar: (partial: string) => void,
	speed = 60
): () => void {
	let i = 0;
	let cancelled = false;

	function tick() {
		if (cancelled || i > text.length) return;
		onChar(text.slice(0, i));
		i++;
		setTimeout(tick, speed);
	}

	tick();
	return () => { cancelled = true; };
}

/**
 * Cycle taglines for the hero
 */
export function cycleTaglines(
	lines: string[],
	onUpdate: (text: string) => void,
	opts: { typeSpeed?: number; holdTime?: number; eraseSpeed?: number } = {}
): () => void {
	const { typeSpeed = 60, holdTime = 2000, eraseSpeed = 30 } = opts;
	let index = 0;
	let cancelled = false;

	async function run() {
		while (!cancelled) {
			const line = lines[index % lines.length];

			// Type forward
			for (let i = 0; i <= line.length && !cancelled; i++) {
				onUpdate(line.slice(0, i));
				await sleep(typeSpeed);
			}

			if (cancelled) break;
			await sleep(holdTime);

			// Erase backward
			for (let i = line.length; i >= 0 && !cancelled; i--) {
				onUpdate(line.slice(0, i));
				await sleep(eraseSpeed);
			}

			if (cancelled) break;
			await sleep(300);
			index++;
		}
	}

	run();
	return () => { cancelled = true; };
}

function sleep(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

/**
 * ASCII divider patterns
 */
export const dividers = {
	thin: '─'.repeat(60),
	double: '═'.repeat(60),
	dotted: '· '.repeat(30),
	dashed: '- '.repeat(30),
	gradient: '░▒▓█' + '█'.repeat(20) + '█▓▒░',
	wave: '░▒▓'.repeat(10) + '▓▒░',
	blocks: '█ '.repeat(30),
} as const;
