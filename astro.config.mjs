// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  redirects: {
      '/servicess/' : {
          status: 301,
          destination: '/services'
      }
  },

  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()]
  }
});