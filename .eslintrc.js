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
    'no-console': 'off',
    'camelcase': 'off',
    'key-spacing': [
      'error', {
        'align': {
          'beforeColon': true,
          'afterColon': true,
          'on': 'colon'
        }
      }
    ],
    'new-cap': 'off',
    'ember-suave/require-access-in-comments': 'off',
  },
  globals: {
    'server': true,
    '$': true
  }
};
