import {
  create,
  clickable,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/auth/login'),
  form: {
    scope: 'form',
    email: fillable('[name="user[email]"]'),
    password: fillable('[name="user[password]"]'),
    login: clickable('button')
  }
});
