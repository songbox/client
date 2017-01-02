import Ember from 'ember';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import SongValidation from 'songbox/validations/song';

export default Ember.Route.extend(ModelChangeset, {
  validator: SongValidation,

  actions: {
    save(changeset) {
      changeset.save().then((song) => {
        this.transitionTo('song', song);
      });
    }
  }
});
