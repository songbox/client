import Ember from 'ember';

const {
  computed,
  inject: { service }
} = Ember;

export default Ember.Service.extend({
  ajax: service(),
  store: service(),

  userId: null,

  user: computed('userId', function () {
    return this.get('store').peekRecord('user', this.get('userId'));
  }),

  load() {
    return this.get('ajax').request('/user/current').then(json => {
      this.get('store').pushPayload(json);
      this.set('userId', json.data.id);
      return this.get('user');
    });
  }

});
