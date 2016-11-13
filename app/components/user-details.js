import Ember from 'ember';

const {
  Component,
  computed: { mapBy }
} = Ember;

export default Component.extend({
  classNames: ['user-details'],

  userOrganizations: mapBy('user.organizationMemberships', 'organization')
});
