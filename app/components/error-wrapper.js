import Ember from 'ember';

/**
  `error-wrapper` handles http response status code errors and other server
  level errors and displays an error page to the user.

  ## default usage

  ```Handlebars
  {{error-wrapper model=model}}
  ```

  @class error-wrapper
  @module Component
  @extends Ember.Component
 */

export default Ember.Component.extend({
  classNames: ['error-wrapper', 'center-pseudo'],

  background: Ember.inject.service(),

  /**
    Returns a message based on the type of error thrown.

    @property errorClass
    @type string
  */
  errorClass: Ember.computed('is404', function() {
    if(this.get('is404')) {
      return 'warning';
    } else {
      return 'danger';
    }
  }),

  /**
    An array of HTTP Status Codes passed by the thrown error.

    @property httpStatusCodes
    @type Array
   */
  // Map the HTTP status codes into an array or
  // an empty array if there are no such status codes
  httpStatusCodes: Ember.computed('model', function() {
    let model = this.get('model');
    if (model && model.hasOwnProperty('errors')) {
      let errors = model.errors;
      return errors.map(function(err) {
        return err.status;
      });
    } else {
      return [];
    }
  }),

  /**
    Determines if an error is a 404 status or not.

    @property is404
    @type Boolean
  */
  is404: Ember.computed('httpStatusCodes', function() {
    return this.get('httpStatusCodes').contains(404);
  }),

  /**
    Updates the background based on the error class.

    @property observeErrorClass
    @type error-wrapper.updateBackground
  */
  observeErrorClass: Ember.observer('errorClass', function() {
    this.updateBackground();
  }),

  /**
    Updates the background on render.

    @method didRender
   */
  didRender() {
    this.updateBackground();
  },

  /**
    Resets the background.

    @method willDestroyElement
   */
  willDestroyElement() {
    this.get('background').reset();
  },

  /**
    Updates the background based on the error thrown.

    @method updateBackground
   */
  updateBackground() {
    this.set('background.class', this.get('errorClass'));
    this.get('background').updateBackgroundClass();
  },
});
