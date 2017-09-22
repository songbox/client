import Route from '@ember/routing/route';

import ModelChangeset from 'songbox/mixins/routes/model-changeset';
import DirtyChangeset from 'songbox/mixins/routes/dirty-changeset';
import SongValidation from 'songbox/validations/song';

export default Route.extend(ModelChangeset, DirtyChangeset, {
  validator: SongValidation,

  actions: {
    save(changeset) {
      changeset.save().then((song) => {
        this.transitionTo('song', song);
      });
    },
    show(song) {
      this.transitionTo('song', song);
    }
  }
});
