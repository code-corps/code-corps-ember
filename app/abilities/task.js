import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed,
  computed: { alias, or },
  get,
  inject: { service },
  isEmpty
} = Ember;

export default Ability.extend({
  credentials: service(),
  currentUser: service(),

  task: alias('model'),

  userIsAuthor: computed('task', 'currentUser.user', function() {
    let taskUserId = get(this, 'task.user.id');
    let currentUserId = get(this, 'currentUser.user.id');

    if (isEmpty(taskUserId) || isEmpty(currentUserId)) {
      return false;
    }

    return taskUserId === currentUserId;
  }),

  membership: alias('credentials.membership'),
  userIsAtLeastAdmin: or('membership.isAdmin', 'membership.isOwner'),
  userIsAtLeastContributor: or('membership.isContributor', 'userIsAtLeastAdmin'),

  canEdit: or('userIsAuthor', 'userIsAtLeastAdmin'),
  canReposition: or('userIsAuthor', 'userIsAtLeastContributor')
});
