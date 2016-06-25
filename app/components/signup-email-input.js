import Ember from 'ember';

export default Ember.Component.extend({
  cachedEmail: '',
  canSubmit: false,
  classNames: ['input-group'],
  hasCheckedOnce: false,
  isAvailableOnServer: false,
  isChecking: false,
  isValid: false,
  timer: null,

  ajax: Ember.inject.service(),

  canCheck: Ember.computed.and('isNotEmpty', 'isNotSameEmail'),
  canShowValidations: Ember.computed.and('hasCheckedOnce', 'isNotChecking', 'isNotEmpty'),
  email: Ember.computed.alias('user.email'),
  isAvailable: Ember.computed.and('isAvailableOnServer', 'isNotEmpty'),
  isEmpty: Ember.computed.empty('email'),
  isInvalid: Ember.computed.not('isValid'),
  isNotEmpty: Ember.computed.not('isEmpty'),
  isNotSameEmail: Ember.computed.not('isSameEmail'),
  isNotChecking: Ember.computed.not('isChecking'),
  isOkay: Ember.computed.and('isAvailable', 'isValid'),
  isUnavailable: Ember.computed.not('isAvailable'),

  isSameEmail: Ember.computed('cachedEmail', 'email', function() {
    return this.get('cachedEmail') === this.get('email');
  }),

  checkAvailable() {
    let email = this.get('email');
    this.sendRequest(email).then((result) => {
      let available = result.available;
      let valid = result.valid;
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

  emailChanged: Ember.observer('email', function() {
    Ember.run.once(this, '_check');
  }),

  sendRequest(email) {
    return this.get('ajax').request('/users/email_available', {
      method: 'GET',
      data: {
        email: email
      }
    });
  },

  actions: {
    keyDown() {
      if (this.get('isNotSameEmail')) {
        this.set('isChecking', true);
      }
    },
  },

  _check() {
    this.set('isChecking', true);

    if (this.get('canCheck')) {
      Ember.run.cancel(this.get('timer'));
      let debounce = Ember.run.debounce(this, function() {
        this.checkAvailable();
      }, 500);
      this.set('timer', debounce);
    } else if (this.get('isSameEmail') && this.get('isNotEmpty')) {
      this.sendAction('emailValidated', this.get('canSubmit'));
      this.set('isChecking', false);
    } else {
      this.sendAction('emailValidated', false);
      this.set('isChecking', false);
    }
  },
});
