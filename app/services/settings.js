import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

/**
  Creates a setting being stored
  @private
  @method setting
*/
function setting(name) {
  return computed({
    get(/*key*/) {
      return this.get(`_lsi.settings.${name}`);
    },
    set(_key, value) {
      this.set(`_lsi.settings.${name}`, value);
      return value;
    }
  })
}

export default Service.extend({
  _lsi: service('local-settings'),

  // define settings here
  nightMode: setting('nightMode'),
  showChords: setting('showChords'),
  showHeader: setting('showHeader')

});
