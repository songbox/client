import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  ajax: service(),
  store: service(),

  userId: null,

  user: computed('userId', function () {
    return this.get('store').peekRecord('user', this.get('userId'));
  }),
  room: readOnly('user.room'),

  load() {
    return this.get('ajax').request('/users/current').then(json => {
      this.get('store').pushPayload(json);
      this.set('userId', json.data.id);
      return this.get('user');
    });
  }

});
