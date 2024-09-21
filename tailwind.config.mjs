/** @type {import('tailwindcss').Config} */

import { addDynamicIconSelectors } from '@iconify/tailwind';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'brand-black': '#303136',
                'brand-gray': '#9D9D9D',
                'brand-purple': '#895159',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '24px',
                md: '80px',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1440px',
            },
        },
    },
    plugins: [addDynamicIconSelectors()],
};
