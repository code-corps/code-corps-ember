import Ember from 'ember';

const {
  Component,
  computed: { alias, mapBy },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['organization-profile'],

  credentials: service(),

  members: mapBy('organization.organizationMemberships', 'member'),
  membersCount: alias('members.length'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('credentials').set('currentOrganization', this.get('organization'));
  }
});
