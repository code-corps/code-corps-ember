import Ember from 'ember';

const {
  Component,
  computed,
} = Ember;

/**
  The `progress-bar` component is used to represent progress on a given
  workflow. (example: progress on the onboarding process)

  ## default usage

  ```Handlebars
  {{progress-bar percentage=progressInPercent}}
  ```

  @class progress-bar
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  attributeBindings: ['style'],
  classNames: ['progress-bar'],

  /**
    The `style` property consumes the current percentage to generate the style
    string for the `progress-bar`. `style` is bound to the components style
    attribute.

    @property style
    @type String
   */
  style: computed('percentage', function() {
    const percentage = this.get('percentage') || 0;
    const css = "width: " + percentage + "%;";

    return Ember.String.htmlSafe(css);
  }),
});
