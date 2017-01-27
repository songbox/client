import {
  create,
  clickable,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/a/songs/:id/edit'),
  form: {
    scope: 'main form',
    title: fillable('[name="song[title]"]'),
    text: fillable('[name="song[text]"]'),
    save: clickable('button')
  }
});
