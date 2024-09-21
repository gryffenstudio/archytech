import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import sanity from '@sanity/astro';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    site: 'https://archytech.netlify.app',
    adapter: netlify(),
    output: 'hybrid',
    devToolbar: {
        enabled: false,
    },
    integrations: [
        react(),
        tailwind(),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
        robotsTxt(),
        sitemap(),
        sanity({
            projectId: 'bpernsxq',
            dataset: 'production',
            useCdn: false,
            apiVersion: '2024-05-14',
            studioBasePath: '/sanity-studio-admin',
        }),
    ],
    image: {
        domains: ['cdn.sanity.io'],
    },
    prefetch: {
        prefetchAll: true,
    },
});
