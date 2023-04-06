require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['@nado/eslint-config-ts'],
  rules: {
    // curly:['error', 'all'],
  },
}
