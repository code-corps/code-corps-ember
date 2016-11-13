import Ember from 'ember';

const {
  Component
} = Ember;

/**
 * `donation-goal` used to display information about a donation goal
 *
 * ## default usage
 *
 * ```handlebars
 * {{donation-goal
 *   canEdit=externalEditableFlag
 *   donationGoal=donationGoal
 *   edit=(action externalEditHandler donationGoal)}}
 *
 * Used as above, the `externalEditHandler` function will receive a call
 * with the `donationGoal` as the first and only argument.
 *
 * @class donation-goal
 * @module Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['donation-goal'],

  /**
   * Flag indicating if component should render the edit link. Should be set from outside
   *
   * @property canEdit
   * @type {Boolean}
   */
  canEdit: false
});
