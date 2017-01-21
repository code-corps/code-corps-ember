import Ember from 'ember';

const {
  Component,
  computed: {
    alias, filterBy, not, notEmpty, setDiff, sort
  }
} = Ember;

/**
 * `donation-goals` used to display and manage a project's donation goals
 *
 * ## default usage
 *
 * {{donation-goals
 *   add=(action 'addDonationGoal')
 *   cancel=(action 'cancelDonationGoal')
 *   edit=(action 'editDonationGoal')
 *   project=project
 *   save=(action 'saveDonationGoal')}}
 *
 *
 * Used as above, the external container, probably a controller
 * will receive the 'add', 'save', 'edit' and 'cancel' actions respectively,
 * with the proper arguments.
 *
 * @class   donation-goals
 * @module  Component
 * @extends EmberComponent
 */
export default Component.extend({
  classNames: ['donation-goals'],
  sorting: ['amount:desc'],

  donationGoals: alias('project.donationGoals'),
  sortedDonationGoals: sort('donationGoals', 'sorting'),

  /**
   * Indicates if the user can add a new donation goal.
   *
   * This is possible if no other donation goal
   * is currently being added or edited.
   *
   * @property canAdd
   * @type {Boolean}
   */
  canAdd: not('_currentlyEditingDonationGoals'),

  /**
   * Indicates if the user can cancel adding or editing a donation goal.
   *
   * This is possible if there is already a saved donation goal present.
   *
   * @property canCancel
   * @type {Boolean}
   */
  canCancel: alias('hasExistingDonationGoals'),

  /**
   * Indicates if the user can start editing a donation goal.
   *
   * This is possible if no other donation goal
   * is currently being added or edited.
   *
   * @property canEdit
   * @type {Boolean}
   */
  canEdit: not('_currentlyEditingDonationGoals'),

  /**
   * Indicates if there are existing donations goals for this project.
   *
   * @property hasExistingDonationGoals
   * @type {Boolean}
   */
  hasExistingDonationGoals: notEmpty('_existingDonationGoals'),

  _currentlyEditingDonationGoals: notEmpty('_editedDonationGoals'),
  _editedDonationGoals: filterBy('project.donationGoals', 'isEditing'),
  _existingDonationGoals: setDiff('project.donationGoals', '_newDonationGoals'),
  _newDonationGoals: filterBy('project.donationGoals', 'isNew')
});
