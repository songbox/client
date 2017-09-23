module.exports = {
  globals: {
    server: true,
  },
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'ember/alias-model-in-controller': 0,
    'ember/named-functions-in-promises': 0,
    'ember/new-module-imports': 2,
    'ember/require-super-in-init': 2,
    'ember/use-ember-get-and-set': 0
  }
};
