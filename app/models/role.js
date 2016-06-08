import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Model.extend({
  ability: attr(),
  kind: attr(),
  name: attr(),

  userRoles: hasMany('user-role', { async: true }),

  isCreative: Ember.computed.equal('kind', 'creative'),
  isSupport: Ember.computed.equal('kind', 'support'),
  isTechnology: Ember.computed.equal('kind', 'technology'),
});
