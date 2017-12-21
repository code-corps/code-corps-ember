import { alias, equal, or } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';
import projectMember from 'code-corps-ember/macros/project-member';

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
  canAdminister: or('{userIsAdmin,userIsOwner}'),

  /**
   * An `ember-can` ability.
   *
   * Indicates if the current user can manage a project.
   * Returns true if the user is the owner of the project.
   * @type {Boolean}
   */
  canManage: alias('userIsOwner'),

  project: alias('model'),

  projectMembership: projectMember('project.projectUsers', 'currentUser.user'),

  userRole: alias('projectMembership.role'),
  userIsAdmin: equal('userRole', 'admin'),
  userIsOwner: equal('userRole', 'owner')
});
