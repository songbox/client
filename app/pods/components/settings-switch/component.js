import Ember from 'ember';

const {
  computed,
  inject: { service }
} = Ember;

const SettingsSwitch = Ember.Component.extend({
  settings: service(),

  key: null,

  setting: computed('key', {
    get(/*key*/) {
      let key = this.get('key');
      return this.get(`settings.${key}`);
    },
    set(_key, value) {
      let key = this.get('key');
      this.set(`settings.${key}`, value);
      return value;
    }
  })

});

SettingsSwitch.reopenClass({
  positionalParams: ['key']
});

export default SettingsSwitch;
