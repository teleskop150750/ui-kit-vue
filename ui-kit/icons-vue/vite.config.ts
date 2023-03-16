import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    Vue(),
    Dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.d.ts'],
      tsConfigFilePath: './tsconfig.vitest.json',
    }),
  ],
  build: {
    sourcemap: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/index.ts'),
      name: 'Icons',
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      treeshake: true,
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
