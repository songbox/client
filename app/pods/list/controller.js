import Ember from 'ember';

const {
  inject: { controller },
  computed: { readOnly }
} = Ember;

export default Ember.Controller.extend({
  listsController: controller('lists'),

  editMode: readOnly('listsController.editMode')
});

