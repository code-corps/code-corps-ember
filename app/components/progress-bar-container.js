import Component from '@ember/component';

/**
  `progress-bar-container` is the container for a progress-bar.

  ## default usage

  ```Handlebars
  {{progress-bar-container animated=animated error=error percentage=percentage}}
  ```

  @class progress-bar-container
  @module Component
  @extends Ember.Component
*/
export default Component.extend({
  classNames: ['progress-bar-container'],

  animated: false,
  error: false,
  percentage: null
});
