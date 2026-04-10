import type { PageLoad } from './$types';
import { loadReadings, findBySlug } from '$lib/utils/content';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const readings = loadReadings();
	const reading = findBySlug(readings, params.slug);
	if (!reading) throw error(404, 'Reading not found');
	return { reading };
};

export const entries = () => {
	return loadReadings().map((r) => ({ slug: r.slug }));
};
