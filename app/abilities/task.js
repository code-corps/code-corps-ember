import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed,
  computed: { alias, or },
  inject: { service },
  isEmpty
} = Ember;

export default Ability.extend({
  credentials : service(),
  currentUser : service(),

  task: alias('model'),

  userIsAuthor: computed('task', 'currentUser.user', function() {
    let taskUserId = this.get('task.user.id');
    let currentUserId = this.get('currentUser.user.id');

    if (isEmpty(taskUserId) || isEmpty(currentUserId)) {
      return false;
    }

    return taskUserId === currentUserId;
  }),

  membership         : alias('credentials.currentUserMembership'),
  userIsAtLeastAdmin : or('membership.isAdmin', 'membership.isOwner'),

  canEdit: or('userIsAuthor', 'userIsAtLeastAdmin')
});
