import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  },
  keyForRelationship: function(key) {
    return Ember.String.underscore(key);
  },
});
