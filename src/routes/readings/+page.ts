import type { PageLoad } from './$types';
import { loadReadings } from '$lib/utils/content';

export const load: PageLoad = async () => {
	return { readings: loadReadings() };
};
