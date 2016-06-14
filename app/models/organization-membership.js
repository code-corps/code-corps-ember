import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  role: DS.attr(),

  member: DS.belongsTo('user', { async: true }),
  organization: DS.belongsTo('organization', { async: true }),

  isAdmin: Ember.computed.equal('role', 'admin'),
  isContributor: Ember.computed.equal('role', 'contributor'),
  isOwner: Ember.computed.equal('role', 'owner'),
  isPending: Ember.computed.equal('role', 'pending'),
});
