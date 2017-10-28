import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed, get } from '@ember/object';

/**
  The `progress-bar` component is used to represent progress on a given
  workflow. (example: error when syncing)

  ## default usage

  ```Handlebars
  {{progress-bar animated=false error=true percentage=progressInPercent}}
  ```

  @class progress-bar
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  attributeBindings: ['style'],
  classNames: ['progress-bar'],
  classNameBindings: ['animatedClass', 'errorClass'],

  animated: false,
  error: false,

  animatedClass: computed('animated', function() {
    let animated = get(this, 'animated');
    return animated ? 'progress-bar--animated' : '';
  }),

  errorClass: computed('error', function() {
    let error = get(this, 'error');
    return error ? 'progress-bar--error' : '';
  }),

  /**
    The `style` property consumes the current percentage to generate the style
    string for the `progress-bar`. `style` is bound to the components style
    attribute.

    @property style
    @type String
   */
  style: computed('percentage', function() {
    let percentage = this.get('percentage') || 0;
    let css = `width: ${percentage}%;`;

    return htmlSafe(css);
  })
});
