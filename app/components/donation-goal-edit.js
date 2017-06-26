import Ember from 'ember';

const {
  Component,
  get,
  getProperties,
  setProperties
} = Ember;

/**
 * `donation-goal-edit` used to edit new and existing donation goals
 *
 * ## default usage
 *
 * ```handlebars
 * {{donation-goal-edit
 *   canCancel=externalCancellableFlag
 *   cancel=(action externalCancelHandler donationGoal)
 *   donationGoal = donationGoal
 *   save=(action externalSaveHandler donationGoal)}}
 *
 * Used as above, the `externalSaveHandler` function will receive a call with the actual
 * `donationGoal` model as the first argument, and the properties set via the
 * component as the second argument.
 *
 * Similarly, the `externalCancelHandler` function will recieve a call with the
 * `donationGoal` as the first and only argument.
 *
 * @class donation-goal-edit
 * @module  Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['donation-goal-edit'],

  /**
   * Indicates if "cancel" button should render.
   *
   * Cancel button should only render if one of two cases
   * - the record is already persisted and we are simply editing it
   * - the record is new, but there are other persisted records, so cancelling this one
   *   does not mean there will be no persisted records at all
   *
   * @property canCancel
   * @type {Boolean}
   */
  canCancel: false,

  init() {
    this._super(...arguments);
    let donationGoal = get(this, 'donationGoal');
    let { amount, description } = getProperties(donationGoal, 'amount', 'description');
    setProperties(this, { amount, description });
  }
});
