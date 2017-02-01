import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const {
  computed: {
    alias, filterBy, gt, mapBy
  }
} = Ember;

export default Model.extend({
  cloudinaryPublicId: attr(),
  description: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  name: attr(),
  slug: attr(),

  organizationMemberships: hasMany('organization-membership', { async: true }),
  projects: hasMany('project', { async: true }),
  stripeConnectAccount: belongsTo('stripe-connect-account', { async: true }),

  hasPendingMembers: gt('pendingMembersCount', 0),
  organizationMembers: mapBy('organizationMemberships', 'member'),
  pendingMembersCount: alias('pendingMemberships.length'),
  pendingMemberships: filterBy('organizationMemberships', 'isPending'),
  totalMembersCount: alias('organizationMembers.length')
});
