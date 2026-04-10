import type { PageLoad } from './$types';
import { loadProjects, loadWordings, loadReadings } from '$lib/utils/content';

export const load: PageLoad = async () => {
	const projects = loadProjects().filter((p) => p.featured).slice(0, 3);
	const wordings = loadWordings().slice(0, 3);
	const readings = loadReadings().slice(0, 5);

	return { projects, wordings, readings };
};
