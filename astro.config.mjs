// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://jfkeci.github.io',
	base: '/x-db',
	integrations: [mdx(), sitemap(), tailwind()],
});
