import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  list: belongsTo(),
  song: belongsTo()
});
