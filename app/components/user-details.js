import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-details'],

  userOrganizations: Ember.computed.mapBy('user.organizationMemberships', 'organization')
});
