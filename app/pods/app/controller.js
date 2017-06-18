import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  settings: service(),

  queryParams: {
    // NOTE: disable query-param for now
    //showMenu: 'open'
    editUser: 'account'
  },
  showMenu: true,
  editUser: false

});
