import Ember from 'ember';

const {
  RSVP
} = Ember;

export default Ember.Route.extend({
  model() {
    return RSVP.hash({
      list: this.modelFor('list'),
      songs: this.store.findAll('song')
    })
  },

  actions: {
    addSong(list, song) {
      const item = this.store.createRecord('list-item', {
        list,
        song
      });
      return item.save();
    }
  }
});
