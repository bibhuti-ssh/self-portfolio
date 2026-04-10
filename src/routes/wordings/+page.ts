import type { PageLoad } from './$types';
import { loadWordings } from '$lib/utils/content';

export const load: PageLoad = async () => {
	return { wordings: loadWordings() };
};
