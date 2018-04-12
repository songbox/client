import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

const SettingsSwitch = Component.extend({
  settings: service(),

  key: null,

  setting: computed('key', {
    get(/*key*/) {
      let key = this.key;
      return this.get(`settings.${key}`);
    },
    set(_key, value) {
      let key = this.key;
      this.set(`settings.${key}`, value);
      return value;
    }
  })

});

SettingsSwitch.reopenClass({
  positionalParams: ['key']
});

export default SettingsSwitch;
