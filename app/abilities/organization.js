import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  isAtLeastAdmin: Ember.computed.or('membership.isAdmin', 'membership.isOwner'),
  userCanJoinOrganization: Ember.computed.empty('membership'),
  userCanLeaveOrganization: Ember.computed.or('membership.isContributor', 'membership.isAdmin'),
  userIsMemberInOrganization: Ember.computed.notEmpty('membership'),

  isAtLeastContributor: Ember.computed.or('membership.isContributor', 'membership.isAdmin', 'membership.isOwner'),

  canJoin: Ember.computed.alias('userCanJoinOrganization'),
  canManage: Ember.computed.alias('isAtLeastAdmin'),

  canCreateIssueTask: true,
  canCreateIdeaTask: true,
  canCreateTaskTask: Ember.computed.alias('isAtLeastContributor')
});
