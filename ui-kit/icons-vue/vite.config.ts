import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
      name: 'UiKitIconsVue',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // output: {
      //   format: 'es',
      //   entryFileNames: '[name].js',
      //   preserveModules: true,
      // },
      external: ['vue'],
    },
  },
})
