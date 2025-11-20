import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => {
			// Strip date prefix from filename for cleaner URLs
			const cleanSlug = post.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
			return {
				...post.data,
				link: `/blog/${cleanSlug}/`,
			};
		}),
	});
}
