import Ember from 'ember';

const {
  Component,
} = Ember;

/**
  `progress-bar-container` is the container for a progress-bar.

  ## default usage

  ```Handlebars
  {{progress-bar-container percentage=percentage}}
  ```

  @class progress-bar-container
  @module Component
  @extends Ember.Component
*/
export default Component.extend({
  classNames: ['progress-bar-container'],
});
