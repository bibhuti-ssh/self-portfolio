import type { PageLoad } from './$types';
import { loadTimeline } from '$lib/utils/content';

export const load: PageLoad = async () => {
	return { entries: loadTimeline() };
};
