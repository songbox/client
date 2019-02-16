/* eslint-env node */
'use strict';

module.exports = {
  extends: 'recommended',

  rules: {
    'no-bare-strings': false,
    'no-invalid-interactive': {
      'additionalInteractiveTags': ['a']
    }
  }
};
