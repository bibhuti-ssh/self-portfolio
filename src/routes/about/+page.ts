import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { settings } = await parent();
	return { settings };
};
