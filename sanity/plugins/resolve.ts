import { type PresentationPluginOptions, defineLocations } from "sanity/presentation";

export const resolve: PresentationPluginOptions['resolve'] = {
    locations: {
        // Add more locations for other post types
        post: defineLocations({
            select: {
                title: 'title',
                slug: 'slug.current',
                category: 'category.slug.current',
            },
            resolve: (doc) => ({
                locations: [
                    {
                        title: doc?.title || 'Untitled',
                        href: `/blog/${doc?.category}/${doc?.slug}`,
                    },
                    { title: 'Archytech Template', href: location.origin },
                ],
            }),
        }),
    },
};
