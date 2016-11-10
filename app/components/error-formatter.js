import Ember from 'ember';

const { Component, computed, Object, String } = Ember;

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

export default Component.extend({
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
  messages: computed('error', function() {
    let errorResponse = Object.create(this.get('error'));
    let handler = this._findHandler(errorResponse);
    if (handler) {
      return handler(errorResponse);
    }
  }),

  /**
   * Determines the type of error from an error response and returns
   * the correct messsage formatter function for it.
   *
   * @param  {Object} errorResponse The error response received from the server
   * @return {Function}             Function which takes the error response and returns a list of messages
   */
  _findHandler(errorResponse) {
    if (errorResponse.get('isAdapterError')) {
      return this._findHandlerForAdapterError(errorResponse);
    } else if (errorResponse.get('error.type') === 'card_error') {
      return this._stripeCardErrorMessages;
    }
  },

  /**
   * If the error response is determined to be an adapter error, this
   * function further determines the type of adapter error and returns
   * the correct message formatter for it.
   * @param  {Object} errorResponse The adapter error response received from the server
   * @return {Function}             Function which takes the response and returns a list of messages
   */
  _findHandlerForAdapterError(errorResponse) {
    let payloadContainsValidationErrors = errorResponse.errors.some((error) => error.status === 422);

    if (payloadContainsValidationErrors) {
      return this._validationErrorMessages;
    } else {
      return this._adapterErrorMessages;
    }
  },

  /**
   * Formats messages for a validation error response
   * In most cases, we do not need this, since we do not render those elements outside
   * a form. In some cases, however, we are creating a record in the background, so
   * we are forced to render those errors separate from a form.
   *
   * @param  {Object} errorResponse The payload received from the server
   * @return {Array}                An array of string messages
   */
  _validationErrorMessages(errorResponse) {
    return (errorResponse.get('errors')).map((e) => {
      let attributePathElements = e.source.pointer.split('/');
      let unformattedAttributeName = attributePathElements[attributePathElements.length - 1];
      let attributeName = String.capitalize(unformattedAttributeName);
      return `${attributeName} ${e.detail}`;
    });
  },

  /**
   * Formats messages for an adapter error response.
   * An adapter error response contains an array of errors with a
   * `title` and a `detail` property, but in most cases, that array only contains
   * one error.
   * @param  {Object} errorResponse Response received from the server
   * @return {Array}                Array of message strings
   */
  _adapterErrorMessages(errorResponse) {
    return (errorResponse.get('errors')).map((e) => `${e.title}: ${e.detail}`);
  },

  /**
   * Formats messages for a stripe card error response.
   *
   * The response contains an `error` object, for which the relevant key is
   * the `message` property.
   * @param  {Object} errorResponse Error response received from the stripe service
   * @return {Array}                An array of string messages, containing single string
   */
  _stripeCardErrorMessages(errorResponse) {
    return [errorResponse.get('error.message')];
  }
});
