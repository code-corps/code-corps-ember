import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['slugged-route-model-details'],

  isOrganization: Ember.computed.equal('sluggedRoute.modelType', 'organization'),
  isUser: Ember.computed.equal('sluggedRoute.modelType', 'user')
});
