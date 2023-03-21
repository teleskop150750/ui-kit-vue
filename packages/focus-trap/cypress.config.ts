/* eslint-env node */

import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents() {},
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    // baseUrl: 'http://localhost:9966',
  },
})
