import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import { getWithDefault, computed } from '@ember/object';
import { cancel, next } from '@ember/runloop';

export default Component.extend({
  classNames: ['material-toast', 'toast'],
  classNameBindings: ['active', 'exiting', 'color'],
  active: false,

  exiting: readOnly('content.exiting'),
  color: computed('content.type', function() {
    switch(this.get('content.type')) {
      case 'danger':
        return 'red darken-2 white-text';
      case 'warning':
        return 'yellow lighten-1 black-text';
      default: return '';
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    // Very shortly after a message is created, add the "active"
    // class to it, so that we can use CSS animations for
    // the entry transition
    this._applyActiveClass = next(() => {
      this.set('active', true);
    });
  },

  willDestroyElement() {
    this._super();
    // Prevent leaking
    this._destroyFlashMessage();
    // To be thorough, we will cancel any queued
    // task to add the "active" class (see: didInsertElement)
    if (this._applyActiveClass) {
      cancel(this._applyActiveClass);
    }
  },

  _destroyFlashMessage() {
    const flash = getWithDefault(this, 'content', false);
    if (flash) {
      flash.destroyMessage();
    }
  }
});
