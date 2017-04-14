import Ember from 'ember';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import SongValidation from 'songbox/validations/song';

export default Ember.Route.extend(ModelChangeset, {
  validator: SongValidation,

  model() {
    return {
      modelName: 'song', // used in ember-form-for
      format: 'opensong'
    };
  },

  actions: {
    save(changeset) {
      return changeset.validate().then(() => {
        if (changeset.get('isValid')) {
          const song = this.store.createRecord('song', changeset.get('change'));
          song.save().then(() => {
            this.transitionTo('songs');
          });
        }
      });
    },
    list() {
      this.transitionTo('songs');
    }
  }
});
