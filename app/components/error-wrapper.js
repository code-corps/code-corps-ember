import Ember from 'ember';

const {
  Component,
  computed,
  inject: { service },
  observer
} = Ember;

/**
  `error-wrapper` handles http response status code errors and other server
  level errors and displays an error page to the user.

  ## default usage

  ```Handlebars
  {{error-wrapper model=model}}
  ```

  @class error-wrapper
  @module Component
  @extends Component
*/

export default Component.extend({
  classNames: ['error-wrapper', 'center-pseudo'],

  background: service(),

  /**
    Returns a message based on the type of error thrown.

    @property errorClass
    @type String
  */
  errorClass: computed('is404', function() {
    if (this.get('is404')) {
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
  httpStatusCodes: computed('model', function() {
    let model = this.get('model');
    if (model && model.hasOwnProperty('errors')) {
      let { errors } = model;
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
  is404: computed('httpStatusCodes', function() {
    return this.get('httpStatusCodes').includes(404);
  }),

  /**
    Updates the background based on the error class.

    @method observeErrorClass
  */
  observeErrorClass: observer('errorClass', function() {
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
  }
});
