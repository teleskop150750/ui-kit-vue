module.exports = {
  extends: ['@nado/stylelint-config-css'],
  rules: {
    'scale-unlimited/declaration-strict-value': null,

    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
  },
}
