module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    'browser': true
  },
  rules: {
    'curly': 'error',
    'no-debugger': 'error',
    'eqeqeq': 'off',
    'no-eval': 'error',
    'guard-for-in': 'off',
    'no-caller': 'error',
    'new-cap': 'off',
    'no-plusplus': 'off',
    'no-undef': 'error',
    'no-unused-vars': 'off',
    'no-console': 'off'
  },
  globals: {
    'server': true,
    '$': true
  }
};
