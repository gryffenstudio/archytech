import { z, defineCollection } from 'astro:content';
import { getImage } from 'astro:assets';

const projectCollection = defineCollection({
    type: 'data',
    schema: ({ image }) =>
        z.object({
            projectName: z.string().max(100, {
                message: 'Project name is too long!',
            }),
            slug: z.string(),
            category: z.enum(['residential', 'commercial', 'in_progress']),
            location: z.string(),
            buildingSize: z.string(),
            completionYear: z.string().nullable(),
            designBrief: z.string(),
            heroImageMobile: image(),
            heroImageDesktop: image(),
            heroImageAlt: z.string(),
            cardImageMobile: image(),
            cardImageDesktop: image(),
            cardImageAlt: z.string(),
            designBriefImageMobile: image(),
            designBriefImageDesktop: image(),
            designBriefImageAlt: z.string(),
            interiorImagesMobile: z.array(
                z.object({
                    image: image(),
                    alt: z.string(),
                }),
            ),
            interiorImagesDesktop: z.array(
                z.object({
                    image: image(),
                    alt: z.string(),
                }),
            ),
            exteriorImagesMobile: z.array(
                z.object({
                    image: image(),
                    alt: z.string(),
                }),
            ),
            exteriorImagesDesktop: z.array(
                z.object({
                    image: image(),
                    alt: z.string(),
                }),
            ),
        }),
});

const teamCollection = defineCollection({
    type: 'data',
    schema: ({ image }) =>
        z.object({
            name: z.string().max(100, {
                message: 'Team member name is too long!',
            }),
            role: z.string(),
            slug: z.string(),
            description1: z.string(),
            description2: z.string().nullable(),
            description3: z.string().nullable(),
            location: z.string(),
            phoneNumber: z.string(),
            email: z.string().email(),
            profileImageMobile: image(),
            profileImageDesktop: image(),
            cardImageMobile: image(),
            cardImageDesktop: image(),
        }),
});

export const collections = {
    projects: projectCollection,
    team: teamCollection,
};
