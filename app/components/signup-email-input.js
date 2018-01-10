import Component from '@ember/component';
import { not, empty, and, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { once, debounce, cancel } from '@ember/runloop';
import { set, get, computed } from '@ember/object';
import Ember from 'ember';

const {
  testing
} = Ember;

const DEBOUNCE_TIMER = testing ? 0 : 500;

export default Component.extend({
  cachedEmail: '',
  canSubmit: false,
  classNames: ['input-group'],
  hasCheckedOnce: false,
  isAvailableOnServer: false,
  isChecking: false,
  isValid: false,
  timer: null,

  ajax: service(),

  canCheck: and('isNotEmpty', 'isNotSameEmail'),
  canShowValidations: and('hasCheckedOnce', 'isNotChecking', 'isNotEmpty'),
  email: alias('user.email'),
  isAvailable: and('isAvailableOnServer', 'isNotEmpty'),
  isEmpty: empty('email'),
  isInvalid: not('isValid'),
  isNotEmpty: not('isEmpty'),
  isNotSameEmail: not('isSameEmail'),
  isNotChecking: not('isChecking'),
  isOkay: and('isAvailable', 'isValid'),
  isUnavailable: not('isAvailable'),

  isSameEmail: computed('cachedEmail', 'email', function() {
    return get(this, 'cachedEmail') === get(this, 'email');
  }),

  checkAvailable() {
    let email = get(this, 'email');
    this.sendRequest(email).then((result) => {
      let { available, valid } = result;
      let validation = valid && available;

      set(this, 'cachedEmail', get(this, 'email'));
      set(this, 'hasCheckedOnce', true);
      set(this, 'isChecking', false);
      set(this, 'isAvailableOnServer', available);
      set(this, 'isValid', valid);

      set(this, 'canSubmit', validation);

      this.sendAction('emailValidated', validation);
    });
  },

  sendRequest(email) {
    return get(this, 'ajax').request('/users/email_available', {
      method: 'GET',
      data: {
        email
      }
    });
  },

  validateEmail: function() {
    once(this, '_check');
    if (get(this, 'isNotSameEmail')) {
      set(this, 'isChecking', true);
    }
  }.observes('email'),

  _check() {
    set(this, 'isChecking', true);

    if (get(this, 'canCheck')) {
      cancel(get(this, 'timer'));
      let deferredAction = debounce(this, function() {
        this.checkAvailable();
      }, DEBOUNCE_TIMER);
      set(this, 'timer', deferredAction);
    } else if (get(this, 'isSameEmail') && get(this, 'isNotEmpty')) {
      this.sendAction('emailValidated', get(this, 'canSubmit'));
      set(this, 'isChecking', false);
    } else {
      this.sendAction('emailValidated', false);
      set(this, 'isChecking', false);
    }
  }
});
