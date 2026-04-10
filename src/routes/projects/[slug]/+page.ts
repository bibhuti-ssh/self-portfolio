import type { PageLoad } from './$types';
import { loadProjects, findBySlug } from '$lib/utils/content';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const projects = loadProjects();
	const project = findBySlug(projects, params.slug);

	if (!project) throw error(404, 'Project not found');

	return { project };
};

export const entries = () => {
	return loadProjects().map((p) => ({ slug: p.slug }));
};
