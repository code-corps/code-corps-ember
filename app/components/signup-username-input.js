import Ember from 'ember';

export default Ember.Component.extend({
  cachedUsername: '',
  canSubmit: false,
  classNames: ['input-group'],
  hasCheckedOnce: false,
  isAvailableOnServer: false,
  isChecking: false,
  isValid: false,
  timer: null,

  ajax: Ember.inject.service(),

  canCheck: Ember.computed.and('isNotEmpty', 'isNotSameUsername'),
  canShowValidations: Ember.computed.and('hasCheckedOnce', 'isNotChecking', 'isNotEmpty'),
  isAvailable: Ember.computed.and('isAvailableOnServer', 'isNotEmpty'),
  isEmpty: Ember.computed.empty('username'),
  isInvalid: Ember.computed.not('isValid'),
  isNotEmpty: Ember.computed.not('isEmpty'),
  isNotSameUsername: Ember.computed.not('isSameUsername'),
  isNotChecking: Ember.computed.not('isChecking'),
  isOkay: Ember.computed.and('isAvailable', 'isValid'),
  isUnavailable: Ember.computed.not('isAvailable'),
  username: Ember.computed.alias('user.username'),

  isSameUsername: Ember.computed('cachedUsername', 'username', function() {
    return this.get('cachedUsername') === this.get('username');
  }),

  checkAvailable() {
    let username = this.get('username');
    this.sendRequest(username).then((result) => {
      let available = result.available;
      let valid = result.valid;
      let validation = valid && available;

      this.set('cachedUsername', this.get('username'));
      this.set('hasCheckedOnce', true);
      this.set('isChecking', false);
      this.set('isAvailableOnServer', available);
      this.set('isValid', valid);

      this.set('canSubmit', validation);
      this.sendAction('usernameValidated', validation);
    });
  },

  sendRequest(username) {
    return this.get('ajax').request('/users/username_available', {
      method: 'GET',
      data: {
        username: username
      }
    });
  },

  usernameChanged: Ember.observer('username', function() {
    Ember.run.once(this, '_check');
  }),

  actions: {
    keyDown() {
      if (this.get('isNotSameUsername')) {
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
    } else if (this.get('isSameUsername') && this.get('isNotEmpty')) {
      this.sendAction('usernameValidated', this.get('canSubmit'));
      this.set('isChecking', false);
    } else {
      this.sendAction('usernameValidated', false);
      this.set('isChecking', false);
    }
  },
});
