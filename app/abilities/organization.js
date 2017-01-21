import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed: { alias, empty, notEmpty, or },
  inject: { service }
} = Ember;

export default Ability.extend({
  credentials: service(),

  canCreateIssueTask: true,
  canCreateIdeaTask: true,
  canCreateTaskTask: alias('isAtLeastContributor'),
  canJoin: alias('userCanJoinOrganization'),
  canManage: alias('isAtLeastAdmin'),

  isAtLeastAdmin: or('membership.isAdmin', 'membership.isOwner'),
  isAtLeastContributor: or('membership.isContributor', 'membership.isAdmin', 'membership.isOwner'),
  userCanJoinOrganization: empty('membership'),
  userCanLeaveOrganization: or('membership.isContributor', 'membership.isAdmin'),
  userIsMemberInOrganization: notEmpty('membership'),

  membership: alias('credentials.membership'),
  organization: alias('model')
});
