import Route from '@ember/routing/route';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import SongValidation from 'songbox/validations/song';

export default Route.extend(ModelChangeset, {
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
            this.transitionTo('song', song);
          });
        }
      });
    },
    list() {
      this.transitionTo('songs');
    }
  }
});
