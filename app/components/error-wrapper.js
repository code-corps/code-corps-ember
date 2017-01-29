import Ember from 'ember';

const {
  Component,
  computed,
  get,
  inject: { service },
  observer,
  set
} = Ember;

/**
  `error-wrapper` handles http response status code errors and other server
  level errors and displays an error page to the user.

  ## default usage

  ```Handlebars
  {{error-wrapper error=model}}
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
    if (get(this, 'is404')) {
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
  httpStatusCodes: computed('error', function() {
    let error = get(this, 'error');
    if (error && error.hasOwnProperty('errors')) {
      let { errors } = error;
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
    return get(this, 'httpStatusCodes').includes(404);
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
    get(this, 'background').reset();
  },

  /**
    Updates the background based on the error thrown.

    @method updateBackground
  */
  updateBackground() {
    set(this, 'background.class', get(this, 'errorClass'));
    get(this, 'background').updateBackgroundClass();
  }
});
