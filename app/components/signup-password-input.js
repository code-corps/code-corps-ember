import Ember from 'ember';
import strength from 'password-strength';

const {
  Component,
  computed,
  computed: { alias, gte, lt, not },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['input-group'],

  ajax: service(),

  canShowValidations: alias('isNotEmpty'),
  isEmpty: lt('passwordLength', 1),
  isInvalid: not('isValid'),
  isNotEmpty: not('isEmpty'),
  isOkay: alias('isValid'),
  isValid: gte('passwordLength', 6),
  passwordLength: alias('password.length'),
  suggestions: alias('strength.feedback.suggestions'),

  password: computed('user.password', function() {
    return this.get('user.password') || '';
  }),

  strength: computed('password', function() {
    let password = this.get('password') || '';
    return strength(password);
  }),

  strengthPercentage: computed('isValid', 'passwordLength', 'strength', function() {
    let isValid = this.get('isValid');
    let percentage = 0;

    if (isValid) {
      let score = this.get('strength.score');
      percentage = (score / 4) * 100;
    } else {
      percentage = this.get('passwordLength');
    }

    return percentage;
  })
});
