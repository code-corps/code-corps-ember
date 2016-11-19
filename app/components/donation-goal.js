import Ember from 'ember';

const {
  Component,
  computed
} = Ember;

/**
 * `donation-goal` used to display information about a donation goal
 *
 * ## default usage
 *
 * ```handlebars
 * {{donation-goal
 *   amountDonated=1000
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
  classNameBindings: ['achieved', 'canEdit', 'current'],

  /**
   * Flag indicating if component should render the edit link. Should be set from outside
   *
   * @property canEdit
   * @type {Boolean}
   */
  canEdit: false,

  achieved: computed.alias('donationGoal.achieved'),
  current: computed.alias('donationGoal.current')
});
