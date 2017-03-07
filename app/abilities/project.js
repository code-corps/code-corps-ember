import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed,
  computed: { alias },
  get,
  inject: { service }
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
  canManage: alias('isOwner'),

  isOwner: computed('project.owner.id', 'currentUser.user.id', function() {
    return get(this, 'project.owner.id') === get(this, 'currentUser.user.id');
  }),

  project: alias('model')
});
