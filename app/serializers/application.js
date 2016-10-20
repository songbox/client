import JSONAPISerializer from 'ember-data/serializers/json-api';
import { singularize } from 'ember-inflector';

export default JSONAPISerializer.extend({
  payloadKeyFromModelName(modelName) {
    return singularize(modelName);
  }
});
