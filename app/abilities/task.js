import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
  credentials: Ember.inject.service(),
  currentUser: Ember.inject.service(),

  task: Ember.computed.alias('model'),

  userIsAuthor: Ember.computed('task', 'currentUser.user', function() {
    let taskUserId = this.get('task.user.id');
    let currentUserId = this.get('currentUser.user.id');

    if (Ember.isEmpty(taskUserId) || Ember.isEmpty(currentUserId)) {
      return false;
    }

    return taskUserId === currentUserId;
  }),

  membership: Ember.computed.alias('credentials.currentUserMembership'),
  userIsAtLeastAdmin: Ember.computed.or('membership.isAdmin', 'membership.isOwner'),

  canEdit: Ember.computed.or('userIsAuthor', 'userIsAtLeastAdmin')
});
