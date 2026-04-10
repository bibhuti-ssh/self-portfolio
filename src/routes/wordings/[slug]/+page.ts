import type { PageLoad } from './$types';
import { loadWordings, findBySlug } from '$lib/utils/content';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const wordings = loadWordings();
	const post = findBySlug(wordings, params.slug);
	if (!post) throw error(404, 'Post not found');
	return { post };
};

export const entries = () => {
	return loadWordings().map((w) => ({ slug: w.slug }));
};
