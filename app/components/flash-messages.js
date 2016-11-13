import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

/**
  `flash-messages` is a container for displaying flash messages. It leverages
  the flash-messages service from the
  [ember-cli-flash](https://github.com/poteto/ember-cli-flash) add-on.

  ## default usage

  ```hbs
  {{flash-messages}}
  ```

  @class flash-messages
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['flash'],

  /**
    @property flashMessages
    @type Ember.Service
   */
  flashMessages: service()
});
