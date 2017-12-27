import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { not, lt, gte, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['input-group'],

  ajax: service(),
  passwordStrength: service(),

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
    let passwordStrength = get(this, 'passwordStrength');
    return passwordStrength.strengthSync(get(this, 'password'));
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
