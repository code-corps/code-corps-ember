import Ember from 'ember';
import strength from 'password-strength';

export default Ember.Component.extend({
  classNames: ['input-group'],

  ajax: Ember.inject.service(),

  canShowValidations: Ember.computed.alias('isNotEmpty'),
  isEmpty: Ember.computed.lt('passwordLength', 1),
  isInvalid: Ember.computed.not('isValid'),
  isNotEmpty: Ember.computed.not('isEmpty'),
  isOkay: Ember.computed.alias('isValid'),
  isValid: Ember.computed.gte('passwordLength', 6),
  passwordLength: Ember.computed.alias('password.length'),
  suggestions: Ember.computed.alias('strength.feedback.suggestions'),

  password: Ember.computed('user.password', function() {
    return this.get('user.password') || '';
  }),

  strength: Ember.computed('password', function () {
    let password = this.get('password') || '';
    return strength(password);
  }),

  strengthPercentage: Ember.computed('isValid', 'passwordLength', 'strength', function() {
    let isValid = this.get('isValid');
    var percentage = 0;

    if (isValid) {
      let score = this.get('strength.score');
      percentage = (score / 4) * 100;
    } else {
      percentage = this.get('passwordLength');
    }

    return percentage;
  }),
});
