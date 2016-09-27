import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Model.extend({
  base64IconData: attr(),
  description: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  name: attr(),
  slug: attr(),

  organizationMemberships: hasMany('organization-membership', { async: true }),
  projects: hasMany('project', { async: true }),

  hasPendingMembers: Ember.computed.gt('pendingMembersCount', 0),
  pendingMembersCount: Ember.computed.alias('pendingMemberships.length'),
  pendingMemberships: Ember.computed.filterBy('organizationMemberships', 'isPending'),
});
