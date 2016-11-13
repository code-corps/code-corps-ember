import Ember from 'ember';
import { Ability } from 'ember-can';

const {
  computed: { alias },
  inject: { service }
} = Ember;

/**
 * Ability object used to determine what the current user can do with a project
 *
 * @module  Ability
 * @extends EmberCan.Ability
 */
export default Ability.extend({
  _credentials: service('credentials'),

  _isOwner: alias('_membership.isOwner'),
  _membership: alias('_credentials.currentUserMembership'),

  /**
   * An `ember-can` ability.
   *
   * Indicates if the current user can manage donation goals in a project.
   * Returns true if the user is the owner of the projects organization.
   * @type {[type]}
   */
  canManageDonationGoals: alias('_isOwner')
});
