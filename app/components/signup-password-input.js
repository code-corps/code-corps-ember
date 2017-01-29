import Ember from 'ember';
import strength from 'password-strength';

const {
  Component,
  computed,
  computed: { alias, gte, lt, not },
  get,
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
    return get(this, 'user.password') || '';
  }),

  strength: computed('password', function() {
    let password = get(this, 'password') || '';
    return strength(password);
  }),

  strengthPercentage: computed('isValid', 'passwordLength', 'strength', function() {
    let isValid = get(this, 'isValid');
    let percentage = 0;

    if (isValid) {
      let score = get(this, 'strength.score');
      percentage = (score / 4) * 100;
    } else {
      percentage = get(this, 'passwordLength');
    }

    return percentage;
  })
});
