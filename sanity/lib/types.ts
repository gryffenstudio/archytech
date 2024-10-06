import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';

export interface Post {
    _type: 'post';
    _createdAt: string;
    title: string;
    description: string;
    slug: Slug;
    cardImageMobile: ImageAsset;
    cardImageDesktop: ImageAsset;
    heroImageMobile: ImageAsset;
    heroImageDesktop: ImageAsset;
    body: PortableTextBlock[];
    category: Category;
    author: Author;
}

export interface Category {
    _type: 'category';
    title: string;
    description: string;
    slug: Slug;
}

export interface Author {
    _type: 'author';
    name: string;
    websiteLink: URL;
    image: ImageAsset;
}
