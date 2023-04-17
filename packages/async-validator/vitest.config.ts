import { fileURLToPath } from 'node:url'

import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    snapshotFormat: {
      printBasicPrototype: true,
    },
    exclude: [...configDefaults.exclude, 'e2e/*'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
})
