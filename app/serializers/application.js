import DS from 'ember-data';
import { singularize } from 'ember-inflector';

export default DS.JSONAPISerializer.extend({
  // Our Phoenix API uses singularized model names
  payloadKeyFromModelName(modelName) {
    return singularize(modelName);
  },
});
