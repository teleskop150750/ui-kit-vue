import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@ui': fileURLToPath(new URL('../../ui-kit/vue/src', import.meta.url)),
      '@theme': fileURLToPath(new URL('../../ui-kit/theme/src', import.meta.url)),
    },
  },
})
