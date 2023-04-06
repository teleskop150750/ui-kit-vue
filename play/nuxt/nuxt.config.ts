import { fileURLToPath, URL } from 'node:url'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    resolve: {
      alias: {
        '@theme': fileURLToPath(new URL('../../ui-kit/theme/src', import.meta.url)),
      },
    },
  },
})
