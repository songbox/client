import {
  validateFormat as format,
  validateLength as length,
  validateConfirmation as confirmation
} from 'ember-changeset-validations/validators';

export default {
  email: format({ type: 'email' }),
  password: length({ min: 8, max: 24 }),
  passwordConfirmation: confirmation({ on: 'password' })
};
