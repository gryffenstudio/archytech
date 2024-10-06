import groq from 'groq';
import { loadQuery } from '../loader/loadQuery';
import type { Category, Post } from './types';
import { visualEditingEnabled, token } from './api';

export async function getPosts(): Promise<Post[]> {
    const query = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc){
            title,
                    description,
                    slug,
                    author->{
                        _id,
                        name,
                    },
                    category->,
                    cardImageMobile,
                    cardImageDesktop,
                    _createdAt,
                    body
        }`;

    const { data } = await loadQuery<Post[]>({
        query: query,
        visualEditingEnabled: visualEditingEnabled,
        token: token,
    });
    return data;
}

export async function getPost(slug: string): Promise<Post> {
    const query = groq`*[_type == "post" && slug.current == $slug][0]{
                    ...,
                    author->{
                        name,
                        websiteLink,
                        slug,
                        image
                    },
                    category->{
                        title,
                        slug
                    },
        }
    `;

    const { data } = await loadQuery<Post>({
        query: query,
        params: { slug },
        visualEditingEnabled: visualEditingEnabled,
        token: token,
    });
    return data;
}

export async function getCategories(): Promise<Category[]> {
    const query = groq`*[_type == "category" && defined(slug.current)]`;
    const { data } = await loadQuery<Category[]>({
        query: query,
        visualEditingEnabled: visualEditingEnabled,
        token: token,
    });
    return data;
}

export async function getCategory(slug: string): Promise<Category> {
    const query = groq`*[_type == "category" && slug.current == $slug][0]`;
    const { data } = await loadQuery<Category>({
        query: query,
        params: { slug },
        visualEditingEnabled: visualEditingEnabled,
        token: token,
    });
    return data;
}
