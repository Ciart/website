import {
  ObsidianMdLoader,
  type ObsidianMdLoaderOptions,
} from 'astro-loader-obsidian';
import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import type { ZodType } from 'astro/zod';

type LegacyObsidianLoader = Omit<Loader, 'schema' | 'createSchema'> & {
  schema: () => Promise<ZodType>;
};

const loadObsidianMarkdown = (opts: ObsidianMdLoaderOptions): Loader => {
  const { schema, ...loader } = ObsidianMdLoader(
    opts,
  ) as unknown as LegacyObsidianLoader;

  return {
    ...loader,
    createSchema: async () => ({
      schema: await schema(),
      types: 'export type Entry = any;',
    }),
  };
};

const optionalStringArray = z.preprocess((value) => {
  if (value == null) {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === 'string');
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return value;
}, z.array(z.string()).optional());

const obsidianWikiLinkSchema = z.object({
  caption: z.string().nullish(),
  className: z.string().nullish(),
  href: z.string().nullable(),
  id: z.string().optional(),
  isEmbedded: z.boolean(),
  title: z.string(),
  type: z.enum(['image', 'audio', 'video', 'file', 'document', 'tag']),
  source: z.string().optional(),
});

export const collections = {
  blog: defineCollection({
    loader: loadObsidianMarkdown({
      base: 'src/blog',
      url: 'posts',
      tagsUrl: '../tags',
      wikilinkFields: ['relateds'],
      removeH1: true,
      pattern: ['**/*.{md,mdx}', '!books/**/*', '!templates/**/*'],
    }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        slug: z.string(),
        permalink: z.string(),
        description: z.string().optional(),
        tags: optionalStringArray,
        aliases: optionalStringArray,
        cssClass: optionalStringArray,
        cssclasses: optionalStringArray,
        links: obsidianWikiLinkSchema.array().optional(),
        relateds: obsidianWikiLinkSchema.array().optional(),
        images: obsidianWikiLinkSchema
          .extend({
            href: image().optional(),
          })
          .array()
          .optional(),
        image: image().optional(),
        cover: image().optional(),
        publish: z.coerce.boolean().optional(),
        published: z.coerce.date().optional(),
        created: z.coerce.date(),
        updated: z.coerce.date(),
        author: z.string().optional(),
        language: z.string().optional(),
        zettelkasten: z
          .object({
            id: z.string(),
            meta: z.unknown().nullable(),
          })
          .optional(),
      }),
  }),
};
