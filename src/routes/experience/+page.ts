import type { PageLoad } from './$types';
import { loadExperience } from '$lib/utils/content';

export const load: PageLoad = async () => {
	return { experience: loadExperience() };
};
