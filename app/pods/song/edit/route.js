import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(song) {
      song.save().then(() => {
        this.transitionTo('songs');
      });
    }
  }
});
