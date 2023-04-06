require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['@nado/eslint-config-vue'],
  rules: {
    'vue/no-unused-vars': 'error',
  },
}
