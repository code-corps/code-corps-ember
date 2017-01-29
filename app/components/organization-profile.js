import Ember from 'ember';

const {
  Component,
  computed: { mapBy },
  inject: { service },
  get
} = Ember;

export default Component.extend({
  classNames: ['organization-profile'],

  credentials: service(),

  organizationMembers: mapBy('organization.organizationMemberships', 'member'),

  didReceiveAttrs() {
    this._super(...arguments);
    get(this, 'credentials').set('currentOrganization', get(this, 'organization'));
  }
});
