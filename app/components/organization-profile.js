import Ember from 'ember';

const {
  Component,
  computed: { mapBy },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['organization-profile'],

  credentials: service(),

  organizationMembers: mapBy('organization.organizationMemberships', 'member'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('credentials').set('currentOrganization', this.get('organization'));
  }
});
