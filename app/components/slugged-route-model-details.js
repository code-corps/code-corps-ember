import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slugged-route-model-details'],

  belongsToOrganization: Ember.computed.equal('sluggedRoute.ownerType', 'Organization'),
  belongsToUser: Ember.computed.equal('sluggedRoute.ownerType', 'User'),
});
