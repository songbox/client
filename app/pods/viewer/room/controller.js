import Ember from 'ember';

const {
  inject: { service }
} = Ember;

export default Ember.Controller.extend({
  settings: service(),

  queryParams: {
    showMenu: 'open'
  },
  showMenu: false

});
