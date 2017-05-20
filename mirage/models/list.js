import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  listItems: hasMany('list_item')
});
