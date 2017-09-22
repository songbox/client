import Service from '@ember/service';
import { computed } from '@ember/object';
import Ember from 'ember';
import LocalSettingsInterface from 'songbox/local-settings-interface';

/**
  Creates a setting being stored
  @private
  @method setting
*/
function setting(name) {
  return computed({
    get(/*key*/) {
      return this.get(`lsi.settings.${name}`);
    },
    set(_key, value) {
      this.set(`lsi.settings.${name}`, value);
      return value;
    }
  })
}

export default Service.extend({

  nightMode: setting('nightMode'),
  showChords: setting('showChords'),
  showHeader: setting('showHeader'),

  init() {
    this._super(...arguments);
    let lsi = LocalSettingsInterface.create({
      serializer: 'json',
      adapter: Ember.testing ? 'local-memory' : 'local-storage',
      prefix: 'songbox/'
    });
    this.set('lsi', lsi);
  }
});
