import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
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

  hasPendingMembers: computed.gt('pendingMembersCount', 0),
  pendingMembersCount: computed.alias('pendingMemberships.length'),
  pendingMemberships: computed.filterBy('organizationMemberships', 'isPending')
});
