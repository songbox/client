import Ember from 'ember';

function discardChanges(model) {
  if (model.get('isDeleted')) {
    return;
  }
  model.rollbackAttributes();
  if (model.get('isNew')) {
    model.deleteRecord();
  }
};

export default Ember.Mixin.create({
  actions: {
    willTransition(transition) {
      this._super(...arguments);

      const model = this.get('controller.model');

      if (! model.get('hasDirtyAttributes')) {
        return true;
      }

      const shouldDiscard = window.confirm('Do you want to discard your changes?');

      if (shouldDiscard) {
        discardChanges(model);
      } else {
        return transition.abort();
      }
    }
  }
});
