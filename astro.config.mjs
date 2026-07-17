// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
// import { visit } from 'unist-util-visit';

import expressiveCode from 'astro-expressive-code';

import react from '@astrojs/react';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://ciart.com',

  markdown: {
    processor: unified(),
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    expressiveCode({
      styleOverrides: {
        codeFontFamily: 'GalmuriMono9, monospace',
        codeFontSize: '15px',
      },
    }),
    react(),
  ],

  adapter: cloudflare(),
});
