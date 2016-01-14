import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['member-details'],

  isOrganization: Ember.computed.equal('member.modelType', 'organization'),
  isUser: Ember.computed.equal('member.modelType', 'user')
});
