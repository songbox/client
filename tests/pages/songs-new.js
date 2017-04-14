import {
  create,
  clickable,
  fillable,
  isVisible,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/a/songs/new'),
  form: {
    scope: 'main form',
    title: fillable('[name="song[title]"]'),
    titleHasError: isVisible('.form-field--has-errors [name="song[title]"]'),
    text: fillable('[name="song[text]"]'),
    submit: clickable('button')
  }
});
