import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed: { alias, empty, notEmpty, or },
  inject: { service }
} = Ember;

export default Ability.extend({
  credentials: service(),

  isAtLeastAdmin: or('membership.isAdmin', 'membership.isOwner'),
  userCanJoinOrganization: empty('membership'),
  userCanLeaveOrganization: or('membership.isContributor', 'membership.isAdmin'),
  userIsMemberInOrganization: notEmpty('membership'),

  isAtLeastContributor: or('membership.isContributor', 'membership.isAdmin', 'membership.isOwner'),

  canJoin: alias('userCanJoinOrganization'),
  canManage: alias('isAtLeastAdmin'),

  canCreateIssueTask: true,
  canCreateIdeaTask: true,
  canCreateTaskTask: alias('isAtLeastContributor'),

  membership: alias('credentials.currentUserMembership'),
  organization: alias('model')
});
