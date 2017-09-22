import {
  validateFormat as format,
  validateLength as length,
  validatePresence as presence
} from 'ember-changeset-validations/validators';

export default {
  email: format({ type: 'email' }),
  password: [
    presence(true),
    length({ min: 8, max: 24 })
  ]
};
