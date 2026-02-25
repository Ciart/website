import type { CollectionEntry } from 'astro:content';

export const getPostDateText = (post: CollectionEntry<'blog'>) => {
  const published = post.data.published || post.data.created;
  return `${published.getFullYear()}년 ${published.getMonth() + 1}월 ${published.getDate()}일`;
};
