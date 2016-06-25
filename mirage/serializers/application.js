import JsonApiSerializer from 'ember-cli-mirage/serializers/json-api-serializer';
import Ember from 'ember';

export default JsonApiSerializer.extend({
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  },
  keyForRelationship: function(key) {
    return Ember.String.underscore(key);
  },
});
