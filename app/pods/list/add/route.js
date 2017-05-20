import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  queryParams: {
    songId: {
      refreshModel: true
    }
  },

  model({ songId }) {
    const options = { reload: false, backgroundReload: true };

    return RSVP.hash({
      list: this.modelFor('list'),
      songs: this.store.findAll('song', options),
      song: songId && this.store.findRecord('song', songId)
    })
  },

  actions: {
    add(list, song) {
      const item = this.store.createRecord('list-item', {
        list,
        song
      });
      return item.save();
    },
    select(list, song) {
      this.transitionTo({ queryParams: { songId: song.get('id') }});
    }
  }
});
