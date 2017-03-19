import Ember from 'ember';

const {
  Component
} = Ember;

/**
 * `become-a-donor` used to initiate the subscribing process
 *
 * ## default usage
 *
 * ```handlebars
 * {{become-a-donor becomeADonor=(action externalHandler)}}
 * ```
 *
 * Used as above, the `externalHandler` function will receive a
 * call when the button rendered by the component is clicked.
 *
 * @class become-a-donor
 * @module  Component
 * @extends Ember.Component
 */
export default Component.extend({
  classNames: ['become-a-donor']
});
