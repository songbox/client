/* jshint node:true */
'use strict';

module.exports = {
  extends: 'recommended',

  rules: {
    'bare-strings': false,
    'invalid-interactive': {
      'additionalInteractiveTags': ['a']
    }
  }
};
