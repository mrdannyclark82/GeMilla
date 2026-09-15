const globals = require('globals');
const prettier = require('eslint-plugin-prettier');
const eslint_recommended = require('@eslint/js');

module.exports = [
  {
    ignores: ['node_modules/'],
  },
  {
    files: ['**/*.js'],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...eslint_recommended.configs.recommended.rules,
      'prettier/prettier': 'error',
    },
  },
];
