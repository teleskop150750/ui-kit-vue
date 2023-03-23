/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */

/* eslint-disable global-require */
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    video: false,
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
