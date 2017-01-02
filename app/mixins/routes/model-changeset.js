import Ember from 'ember';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default Ember.Mixin.create({

  setupController(controller, model) {
    this._super(...arguments);
    const validator = this.validator;
    const changeset = new Changeset(model, lookupValidator(validator), validator);
    controller.set('changeset', changeset);
  },

  actions: {
    willTransition(transition) {
      this._super(...arguments);

      const changeset = this.get('controller.changeset');

      if (changeset.get('isPristine')) {
        return true;
      }

      const shouldDiscard = window.confirm('Do you want to discard your changes?');

      if (! shouldDiscard) {
        return transition.abort();
      }
    }
  }

});
