import Controller, { inject as controller } from '@ember/controller';
import { readOnly } from '@ember/object/computed';

export default Controller.extend({
  listsController: controller('lists'),

  editMode: readOnly('listsController.editMode')
});

