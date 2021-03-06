import {
  clickable,
  collection,
  hasClass,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.bm-menu',

  main: {
    scope: 'main',

    header: text('h1'),

    actions: {
      new: clickable('[data-test-list-action-new]'),
      add: clickable('[data-test-list-action-add]'),
      edit: clickable('[data-test-list-action-edit]')
    },

    items: collection('ul li', {
      click: clickable('[data-test-item-text]'),
      isSelected: hasClass('active'),
      text: {
          scope: '[data-test-item-text]',

          title: text('div', { at: 0 }),
          details: text('div', { at: 1 })
      },
      buttons: {
          add: clickable('[data-test-item-button-add]'),
          remove: clickable('[data-test-item-button-remove]')
      }
    })
  },
  footer: {
    scope: 'footer',

    openAccount: clickable('a')
  }
};
