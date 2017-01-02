import Ember from 'ember';

import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

export default Ember.Mixin.create({

  setupController(controller, model) {
    this._super(...arguments);
    const validator = this.validator;
    const changeset = new Changeset(model, lookupValidator(validator), validator);
    controller.set('changeset', changeset);
  }

});
