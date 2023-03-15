/* eslint-disable unicorn/no-null */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { propertyOrdering, selectorOrdering } = require('stylelint-semantic-groups')

module.exports = {
  plugins: [
    // 'stylelint-order',
    // 'stylelint-declaration-strict-value',
    // 'stylelint-color-format',
    // 'stylelint-declaration-block-no-ignored-properties',
  ],
  extends: ['stylelint-config-standard', 'stylelint-config-html'],
  rules: {
    // 'declaration-no-important': true,
    // 'scale-unlimited/declaration-strict-value': [
    //   '/color$/',
    //   {
    //     ignoreValues: ['currentColor', 'inherit', 'transparent', 'unset'],
    //   },
    // ],
    // 'selector-class-pattern': [
    //   '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$',
    //   {
    //     message: 'BEM',
    //   },
    // ],
    // 'declaration-property-value-no-unknown': true,
    // 'string-quotes': 'single',
    // 'color-format/format': {
    //   format: 'hsl',
    // },
    // 'color-function-notation': 'modern',
    // 'plugin/declaration-block-no-ignored-properties': true,
    // 'order/order': selectorOrdering,
    // 'order/properties-order': propertyOrdering,
    // 'declaration-empty-line-before': [
    //   'always',
    //   {
    //     ignore: ['after-comment', 'after-declaration', 'first-nested', 'inside-single-line-block'],
    //   },
    // ],

    // 'length-zero-no-unit': null,
  },
}
