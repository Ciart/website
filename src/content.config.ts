import {
  ObsidianDocumentSchema,
  ObsidianMdLoader,
  ObsidianWikiLinkSchema,
} from 'astro-loader-obsidian';
import { defineCollection, z } from 'astro:content';

export const collections = {
  blog: defineCollection({
    loader: ObsidianMdLoader({
      base: 'src/blog',
      url: 'posts',
      tagsUrl: '../tags',
      wikilinkFields: ['relateds'],
      removeH1: true,
      pattern: ['*.md', '!(books)/**/*.md'],
    }),
    schema: ({ image }) =>
      ObsidianDocumentSchema.extend({
        images: ObsidianWikiLinkSchema.extend({
          href: image().optional(),
        })
          .array()
          .optional(),
        image: image().optional(),
        cover: image().optional(),
        published: z.date().optional(),
      }),
  }),
};
