import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  role: attr(),

  member: belongsTo('user', { async: true }),
  organization: belongsTo('organization', { async: true }),

  isAdmin: computed.equal('role', 'admin'),
  isContributor: computed.equal('role', 'contributor'),
  isOwner: computed.equal('role', 'owner'),
  isPending: computed.equal('role', 'pending')
});
