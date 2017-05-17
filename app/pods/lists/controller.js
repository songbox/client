import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    editMode: 'edit'
  },
  editMode: false
});

