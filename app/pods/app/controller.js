import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  settings: service(),

  queryParams: {
    // NOTE: disable query-param for now
    //showMenu: 'open'
    editUser: 'account'
  },
  showMenu: true,
  editUser: false

});
