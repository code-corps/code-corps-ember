import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed,
  computed: { alias, equal },
  get,
  inject: { service },
  isEmpty
} = Ember;

/**
 * Ability object used to determine what the current user can do with a project
 *
 * @module  Ability
 * @extends EmberCan.Ability
 */
export default Ability.extend({
  currentUser: service(),

  /**
   * An `ember-can` ability.
   *
   * Indicates if the current user can manage a project.
   * Returns true if the user is the owner of the project.
   * @type {Boolean}
   */
  canManage: alias('userIsOwner'),

  // TODO: Similar code is defined in
  // - `components/project-details.js`
  // - `abilities/task.js`
  projectMembership: computed('project.projectUsers', 'currentUser.user.id', function() {
    let currentUserId = get(this, 'currentUser.user.id');

    if (isEmpty(currentUserId)) {
      return false;
    } else {
      return get(this, 'project.projectUsers').find((item) => {
        return get(item, 'user.id') === currentUserId;
      });
    }
  }),

  userRole: alias('projectMembership.role'),
  userIsOwner: equal('userRole', 'owner'),

  project: alias('model')
});
