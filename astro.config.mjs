// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
// import { visit } from 'unist-util-visit';

import expressiveCode from 'astro-expressive-code';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ciart.kr',
  // markdown: {
  //   remarkPlugins: [
  //     () => {
  //       return (tree) => {
  //         visit(tree, function (node) {
  //           if (node.type === 'heading') {
  //             node.depth++
  //           }
  //         })
  //       };
  //     },
  //   ]
  // },
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
});
