import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed,
  computed: { alias, equal, or },
  get,
  inject: { service },
  isEmpty
} = Ember;

export default Ability.extend({
  currentUser: service(),

  task: alias('model'),

  userIsAuthor: computed('task.user.id', 'currentUser.user.id', function() {
    let taskUserId = this.get('task.user.id');
    let currentUserId = this.get('currentUser.user.id');

    if (isEmpty(currentUserId)) {
      return false;
    } else {
      return taskUserId === currentUserId;
    }
  }),

  // TODO: Similar code is defined in `components/project-details.js`
  projectMembership: computed('task.project.projectUsers', 'currentUser.user.id', function() {
    let currentUserId = get(this, 'currentUser.user.id');

    if (isEmpty(currentUserId)) {
      return false;
    } else {
      return get(this, 'task.project.projectUsers').find((item) => {
        return get(item, 'user.id') === currentUserId;
      });
    }
  }),

  userIsOwner: computed('currentUser.user.id', 'task.project.owner.id', function() {
    return get(this, 'currentUser.user.id') === get(this, 'task.project.owner.id');
  }),

  userRole: alias('projectMembership.role'),
  userIsContributor: equal('userRole', 'contributor'),
  userIsAdmin: equal('userRole', 'admin'),

  //
  // Abilities
  //

  // task authors, admins and owners can edit
  canEdit: or('{userIsAuthor,userIsAdmin,userIsOwner}'),
  // task authors, contributors, admins and owners can assign and reposition
  canAssign: or('canEdit', 'userIsContributor'),
  canReposition: alias('canAssign')
});
