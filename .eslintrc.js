module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'camelcase': 'off',
    'ember-suave/require-access-in-comments': 'off',
    'key-spacing': 'off',
    'new-cap': 'off',
    'no-console': 'off'
  },
  globals: {
    'server': true,
    '$': true
  }
};
