import {
  create,
  clickable,
  fillable,
  isVisible,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/a/lists/new'),
  form: {
    scope: 'main form',
    name: fillable('[name="list[name]"]'),
    submit: clickable('button:first'),
    cancel: clickable('button:last')
  }
});
