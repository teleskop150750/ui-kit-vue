/* eslint-env node */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable global-require */
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      // require('@cypress/code-coverage/task')(on, config)
      // on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));
      // implement node event listeners here
      on('task', {
        getFixtures() {
          return require('./test/fixtures/cj_fixtures.cjs')
        },
      })
    },
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    // baseUrl: 'http://localhost:4173'
  },
})
