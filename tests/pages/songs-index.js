import {
  create,
  clickable,
  collection,
  visitable,
  text
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/a/songs'),

  sidebar: {
    scope: '.bm-menu main',

    header: text('h1'),

    items: collection({
      itemScope: 'ul li',

      item: {
        title: text('div', { at: 0 }),
        details: text('div', { at: 1 }),
        click: clickable()
      }
    })
  }
});
