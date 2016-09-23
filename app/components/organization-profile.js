import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['organization-profile'],

  credentials: Ember.inject.service(),

  organizationMembers: Ember.computed.mapBy('organization.organizationMemberships', 'organization'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('credentials').set('currentOrganization', this.get('organization'));
  },

});
