import Ember from 'ember';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Component.extend({
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
