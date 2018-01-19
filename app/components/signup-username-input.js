import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import { alias, and, empty, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { once, debounce, cancel } from '@ember/runloop';
import Ember from 'ember';

const {
  testing
} = Ember;

const DEBOUNCE_TIMER = testing ? 0 : 500;

/**
  `signup-username-input` composes the username input on the signup page. It
  handles all the validations for usernames.

  ## default usage
  ```handlebars
  {{signup-username-input user=user usernameValidated="usernameValidatedAction"}}
  ```

  @class signup-username-input
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['input-group'],

  ajax: service(),

  /**
    A cached copy of the last username that was checked.

    @property cachedUsername
    @type String
   */
  cachedUsername: '',

  /**
    A flag that is set to `true` if the username is valid and available.

    @property canSubmit
    @type Boolean
   */
  canSubmit: false,

  /**
    Is set to `true` after a username is checked once.

    @property hasCheckedOnce
    @type Boolean
   */
  hasCheckedOnce: false,

  /**
    Is set to `true` if the username is not already being used.

    @property isAvailableOnServer
    @type Boolean
   */
  isAvailableOnServer: false,

  /**
    Set to `true` if the username is currently being validated.

    @property isChecking
    @type Boolean
   */
  isChecking: false,

  /**
    Set to `true` if the username is valid.

    @property isValid
    @type Boolean
   */
  isValid: false,

  /**
    @property timer
    @type Number
   */
  timer: null,

  /**
    Returns `true` if the username input is not empty and it is not the cached
    username.

    @property canCheck
    @type Boolean
   */
  canCheck: and('isNotEmpty', 'isNotSameUsername'),

  /**
    Returns `true` if the current username is not empty, it has already been
    checked once, and it is not currently being checked.

    @property canShowValidations
    @type Boolean
   */
  canShowValidations: and('hasCheckedOnce', 'isNotChecking', 'isNotEmpty'),

  /**
    Returns `true` if the username is not already being used and it is not
    empty.

    @property isAvailable
    @type Boolean
   */
  isAvailable: and('isAvailableOnServer', 'isNotEmpty'),

  /**
    Returns `true` if the username is empty.

    @property isEmpty
    @type Boolean
   */
  isEmpty: empty('username'),

  /**
    Returns `true` if the username is not valid.

    @property isInvalid
    @type Boolean
   */
  isInvalid: not('isValid'),

  /**
    Returns `true` if the username is not empty.

    @property isNotEmpty
    @type Boolean
   */
  isNotEmpty: not('isEmpty'),

  /**
    Returns `true` if the username is not the cached username.

    @property isNotSameUsername
    @type Boolean
   */
  isNotSameUsername: not('isSameUsername'),

  /**
    Returns `true` if the username is not currently being validated.

    @property isNotChecking
    @type Boolean
   */
  isNotChecking: not('isChecking'),

  /**
    Returns `true` if the username is valid and not already in use.

    @property isOkay
    @type Boolean
   */
  isOkay: and('isAvailable', 'isValid'),

  /**
    Returns `true` if the username is either empty or is already in use.

    @property isUnavailable
    @type Boolean
   */
  isUnavailable: not('isAvailable'),

  /**
    The user's username.

    @property username
    @type String
   */
  username: alias('user.username'),

  /**
    Returns `true` if the username is the same as the cached username.

    @property isSameUsername
    @type Boolean
   */
  isSameUsername: computed('cachedUsername', 'username', function() {
    return get(this, 'cachedUsername') === get(this, 'username');
  }),

  validateUsername: function() {
    once(this, '_check');
    if (get(this, 'isNotSameUsername')) {
      set(this, 'isChecking', true);
    }
  }.observes('username'),

  /**
    Checks if the username is valid and available. Caches the username so that
    it doesn't have to request more than once.

    @method checkAvailable
   */
  checkAvailable() {
    let username = get(this, 'username');
    this.sendRequest(username).then((result) => {
      let { available, valid } = result;
      let validation = valid && available;

      set(this, 'cachedUsername', get(this, 'username'));
      set(this, 'hasCheckedOnce', true);
      set(this, 'isChecking', false);
      set(this, 'isAvailableOnServer', available);
      set(this, 'isValid', valid);

      set(this, 'canSubmit', validation);
      this.sendAction('usernameValidated', validation);
    });
  },

  /**
    Sends a request to '/users/username_available' with the username.

    @method sendRequest
    @return Promise
   */
  sendRequest(username) {
    return get(this, 'ajax').request('/users/username_available', {
      method: 'GET',
      data: {
        username
      }
    });
  },

  _check() {
    set(this, 'isChecking', true);

    if (get(this, 'canCheck')) {
      cancel(get(this, 'timer'));
      let deferredAction = debounce(this, function() {
        this.checkAvailable();
      }, DEBOUNCE_TIMER);
      set(this, 'timer', deferredAction);
    } else if (get(this, 'isSameUsername') && get(this, 'isNotEmpty')) {
      this.sendAction('usernameValidated', get(this, 'canSubmit'));
      set(this, 'isChecking', false);
    } else {
      this.sendAction('usernameValidated', false);
      set(this, 'isChecking', false);
    }
  }
});
