import {
  create,
  clickable,
  fillable,
  isVisible,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/auth/register'),
  form: {
    scope: 'form',
    email: fillable('[name="user[email]"]'),
    password: fillable('[name="user[password]"]'),
    passwordConfirmation: fillable('[name="user[passwordConfirmation]"]'),
    emailHasError: isVisible('.form-field--has-errors [name="user[email]"]'),
    passwordHasError: isVisible('.form-field--has-errors [name="user[password]"]'),
    passwordConfirmationHasError: isVisible('.form-field--has-errors [name="user[passwordConfirmation]"]'),
    register: clickable('button')
  }
});
