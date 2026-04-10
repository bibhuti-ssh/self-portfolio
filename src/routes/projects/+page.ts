import type { PageLoad } from './$types';
import { loadProjects } from '$lib/utils/content';

export const load: PageLoad = async () => {
	return { projects: loadProjects() };
};
