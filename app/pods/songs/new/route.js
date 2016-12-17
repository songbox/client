import Ember from 'ember';
import DirtyModelCheck from 'songbox/mixins/routes/dirty-model-check';

export default Ember.Route.extend(DirtyModelCheck, {
  model() {
    return this.store.createRecord('song');
  },

  actions: {
    save(song) {
      song.save().then(() => {
        this.transitionTo('songs');
      });
    }
  }
});
