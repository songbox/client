import {
  create,
  clickable,
  fillable,
  isVisible,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/auth/login'),
  form: {
    scope: 'form',
    email: fillable('[name="user[email]"]'),
    password: fillable('[name="user[password]"]'),
    emailHasError: isVisible('.form-field--has-errors [name="user[email]"]'),
    passwordHasError: isVisible('.form-field--has-errors [name="user[password]"]'),
    login: clickable('button')
  }
});
