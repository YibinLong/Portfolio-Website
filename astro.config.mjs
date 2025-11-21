// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://yibinlong.com',
	integrations: [mdx(), sitemap()],
	adapter: vercel(),
	markdown: {
		shikiConfig: {
			theme: 'github-light',
		},
	},
});
