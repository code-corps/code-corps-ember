import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  base64IconData: attr(),
  description: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  name: attr(),
  slug: attr(),

  organizationMemberships: hasMany('organization-membership', { async: true }),
  projects: hasMany('project', { async: true }),
  stripeConnectAccount: belongsTo('stripe-connect-account', { async: true }),

  hasPendingMembers: computed.gt('pendingMembersCount', 0),
  organizationMembers: computed.mapBy('organizationMemberships', 'member'),
  pendingMembersCount: computed.alias('pendingMemberships.length'),
  pendingMemberships: computed.filterBy('organizationMemberships', 'isPending'),
  totalMembersCount: computed.alias('organizationMembers.length')
});
