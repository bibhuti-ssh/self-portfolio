import type { PageLoad } from './$types';
import { loadAchievements } from '$lib/utils/content';

export const load: PageLoad = async () => {
	return { achievements: loadAchievements() };
};
