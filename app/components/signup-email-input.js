import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, and, empty, not },
  inject: { service },
  observer,
  run: { cancel, debounce, once }
} = Ember;

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
    return this.get('cachedEmail') === this.get('email');
  }),

  checkAvailable() {
    let email = this.get('email');
    this.sendRequest(email).then((result) => {
      let { available, valid } = result;
      let validation = valid && available;

      this.set('cachedEmail', this.get('email'));
      this.set('hasCheckedOnce', true);
      this.set('isChecking', false);
      this.set('isAvailableOnServer', available);
      this.set('isValid', valid);

      this.set('canSubmit', validation);
      this.sendAction('emailValidated', validation);
    });
  },

  emailChanged: observer('email', function() {
    once(this, '_check');
  }),

  sendRequest(email) {
    return this.get('ajax').request('/users/email_available', {
      method: 'GET',
      data: {
        email
      }
    });
  },

  actions: {
    keyDown() {
      if (this.get('isNotSameEmail')) {
        this.set('isChecking', true);
      }
    }
  },

  _check() {
    this.set('isChecking', true);

    if (this.get('canCheck')) {
      cancel(this.get('timer'));
      let deferredAction = debounce(this, function() {
        this.checkAvailable();
      }, 500);
      this.set('timer', deferredAction);
    } else if (this.get('isSameEmail') && this.get('isNotEmpty')) {
      this.sendAction('emailValidated', this.get('canSubmit'));
      this.set('isChecking', false);
    } else {
      this.sendAction('emailValidated', false);
      this.set('isChecking', false);
    }
  }
});
