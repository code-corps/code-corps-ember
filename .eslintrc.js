module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    'browser': true
  },
  rules: {
    'comma-dangle': 'off',
    'spaced-comment': 'off',
    'object-shorthand': 'off',
    'quotes': 'off',
    'brace-style': 'off',
    'max-statements-per-line': 'off',
    'keyword-spacing': 'off',
    'no-var': 'off',
    'space-in-parens': 'off',
    'generator-star-spacing': 'off',
    'indent': 'off',
    'space-infix-ops': 'off',
    'operator-linebreak': 'off',
    'object-curly-spacing': 'off',
    'dot-notation': 'off',
    'no-console': 'off',
    'prefer-template': 'off',
    'space-before-function-paren': 'off',
    'comma-spacing': 'off',
    'no-multiple-empty-lines': 'off',
    'camelcase': 'off',
    'no-trailing-spaces': 'off',
    'key-spacing': 'off',
    'new-cap': 'off',
    'space-before-blocks': 'off',
    'ember-suave/no-const-outside-module-scope': 'off',
    'ember-suave/no-direct-property-access': 'off',
    'ember-suave/prefer-destructuring': 'off',
    'ember-suave/require-access-in-comments': 'off',
    'ember-suave/require-const-for-ember-properties': 'off'
  },
  globals: {
    'server': true,
    '$': true
  }
};
