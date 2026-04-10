import type { Project, Reading, Wording } from '$lib/types/content';

type MdModule = {
	metadata: Record<string, unknown>;
	default: unknown;
};

function extractSlug(path: string): string {
	return path.split('/').pop()!.replace('.md', '');
}

export function loadProjects(): Project[] {
	const modules = import.meta.glob<MdModule>('/src/lib/content/projects/*.md', { eager: true });
	const items: Project[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = extractSlug(path);
		items.push({
			...(module.metadata as unknown as Project),
			slug,
			content: module.default as any
		});
	}

	return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function loadReadings(): Reading[] {
	const modules = import.meta.glob<MdModule>('/src/lib/content/readings/*.md', { eager: true });
	const items: Reading[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = extractSlug(path);
		items.push({
			...(module.metadata as unknown as Reading),
			slug,
			content: module.default as any
		});
	}

	return items.sort((a, b) => new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime());
}

export function loadWordings(): Wording[] {
	const modules = import.meta.glob<MdModule>('/src/lib/content/wordings/*.md', { eager: true });
	const items: Wording[] = [];

	for (const [path, module] of Object.entries(modules)) {
		const slug = extractSlug(path);
		items.push({
			...(module.metadata as unknown as Wording),
			slug,
			content: module.default as any
		});
	}

	return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function findBySlug<T extends { slug: string }>(items: T[], slug: string): T | undefined {
	return items.find((item) => item.slug === slug);
}
