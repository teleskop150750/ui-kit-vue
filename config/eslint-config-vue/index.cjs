module.exports = {
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        // 'no-unused-vars': 'off',
        // 'no-undef': 'off',
        // '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  extends: ['plugin:vue/vue3-recommended', '@nado/eslint-config-ts', 'prettier'],
  plugins: ['prettier'],
  "rules": {
    "prettier/prettier": "error",
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': 'off',
    // 'vue/no-v-html': 'off',
    // 'vue/require-prop-types': 'off',
    // 'vue/require-default-prop': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/prefer-import-from-vue': 'off',

    // reactivity transform
    // 'vue/no-setup-props-destructure': 'off',

    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
    'vue/block-tag-newline': [
      'error',
      {
        singleline: 'always',
        multiline: 'always',
      },
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineProps', 'defineEmits'],
      },
    ],
    'vue/html-comment-content-spacing': [
      'error',
      'always',
      {
        exceptions: ['-'],
      },
    ],
    'vue/no-restricted-v-bind': ['error', '/^v-/'],
    'vue/no-useless-v-bind': 'error',
    'vue/no-v-text-v-html-on-component': 'error',
    'vue/padding-line-between-blocks': ['error', 'always'],
    'vue/prefer-separate-static-class': 'error',

    // extensions
    // 'vue/array-bracket-spacing': ['error', 'never'],
    // 'vue/arrow-spacing': ['error', { before: true, after: true }],
    // 'vue/block-spacing': ['error', 'always'],
    // 'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    // 'vue/comma-dangle': ['error', 'always-multiline'],
    // 'vue/comma-spacing': ['error', { before: false, after: true }],
    // 'vue/comma-style': ['error', 'last'],
    // 'vue/dot-location': ['error', 'property'],
    'vue/dot-notation': ['error', { allowKeywords: true }],
    'vue/eqeqeq': ['error', 'smart'],
    // 'vue/func-call-spacing': ['off', 'never'],
    'vue/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // Обеспечить постоянный интервал до и после ключевых слов
    'vue/keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: {
            after: true,
          },
          throw: {
            after: true,
          },
          case: {
            after: true,
          },
        },
      },
    ],
    // Запретить константные выражения в условиях
    'vue/no-constant-condition': 'warn',
    // Запретить пустые шаблоны деструктурирования
    'vue/no-empty-pattern': 'error',
    // Запретить ненужные скобки
    'vue/no-extra-parens': ['error', 'functions'],
    // Запретить неправильные пробелы
    'vue/no-irregular-whitespace': 'error',
    // Запретить литеральные числа, которые теряют точность
    'vue/no-loss-of-precision': 'error',
    // Запретить указанный синтаксис
    'vue/no-restricted-syntax': ['error', 'DebuggerStatement', 'LabeledStatement', 'WithStatement'],
    // Запретить разреженные массивы
    'vue/no-sparse-arrays': 'error',
    // Применять согласованные разрывы строк после открытия и перед закрытием фигурных скобок
    'vue/object-curly-newline': ['error', { multiline: true, consistent: true }],
    // Обеспечьте постоянный интервал внутри фигурных скобок
    'vue/object-curly-spacing': ['error', 'always'],
    // Принудительное размещение свойств объекта на отдельных строках
    'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
    // Требовать или запрещать сокращенный синтаксис методов и свойств для литералов объектов
    'vue/object-shorthand': [
      'error',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    // Обеспечьте согласованный стиль разрыва строки для операторов
    // 'vue/operator-linebreak': ['error', 'before'],
    // Требовать литералы шаблонов вместо конкатенации строк
    'vue/prefer-template': 'error',
    // Требовать заключения в кавычки имен свойств литерала объекта
    'vue/quote-props': ['error', 'consistent-as-needed'],
    // Обеспечьте постоянный интервал внутри круглых скобок
    'vue/space-in-parens': ['error', 'never'],
    // Требовать пробелы вокруг инфиксных операторов
    'vue/space-infix-ops': 'error',
    // Обеспечьте постоянный интервал до или после унарных операторов
    'vue/space-unary-ops': ['error', { words: true, nonwords: false }],
    // Требовать или запрещать пробелы вокруг встроенных выражений строк шаблона
    'vue/template-curly-spacing': 'error',
  },
}
