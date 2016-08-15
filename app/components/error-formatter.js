import Ember from 'ember';

/**
  `error-formatter' returns a formatted error message. Place within an 'if'
  block to return only when there really is an error.

  ## default usage

  ```Handlebars
  {{#if error}}
    {{error-formatter error=error}}
  {{/if}}
  ```

  @class error-formatter
  @module Component
  @extends Ember.Component
 */

export default Ember.Component.extend({
  classNames: ['error-formatter'],

  /**
    The default error message if the error has no other messages

    @property defaultMessage
    @type String
   */
  defaultMessage: 'An unexpected error has occured',

  /**
    The messages that are returned by the error thrown.

    @property messages
    @type String
   */
  messages: Ember.computed('error.errors', function() {
    return (this.get('error.errors') || []).map((e) => {
      return `${e.title}: ${e.detail}`;
    });
  }),
});
