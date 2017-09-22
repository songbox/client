import Mixin from '@ember/object/mixin';

export default Mixin.create({

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
