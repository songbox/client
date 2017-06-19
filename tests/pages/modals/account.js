import {
  create,
  clickable,
  fillable,
  isVisible,
  value,
  visitable
} from 'ember-cli-page-object';

export default create({
  scope: '.modal-dialog',

  open: visitable('/a/songs/?account=true'),
  isOpen: isVisible(),

  form: {
    scope: 'form',
    password: fillable('[name="user[password]"]'),
    passwordConfirmation: fillable('[name="user[passwordConfirmation]"]'),
    passwordValue: value('[name="user[password]"]'),
    passwordConfirmationValue: value('[name="user[passwordConfirmation]"]'),
    submit: clickable('button:first'),
    cancel: clickable('button:last')
  },

  logout: clickable('.button--warn')
});
