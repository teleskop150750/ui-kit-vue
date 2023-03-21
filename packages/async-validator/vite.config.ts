import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Dts({
      insertTypesEntry: true,
      include: ['src/**/*.ts', 'src/**/*.d.ts'],
      tsConfigFilePath: './tsconfig.node.json',
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, './src/index.ts'),
      name: 'AsyncValidator',
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'index',
    },
  },
})
