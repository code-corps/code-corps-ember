import DS from 'ember-data';
import { singularize } from 'ember-inflector';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  // Our Phoenix API uses singularized model names
  payloadKeyFromModelName(modelName) {
    return singularize(modelName);
  }
});
