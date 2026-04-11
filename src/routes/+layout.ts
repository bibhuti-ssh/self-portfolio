import type { LayoutLoad } from './$types';
import { loadSettings } from '$lib/utils/content';

export const prerender = true;
export const trailingSlash = 'never';

export const load: LayoutLoad = async () => {
	const settings = loadSettings();
	return { settings };
};
