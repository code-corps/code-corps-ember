import { not } from '@ember/object/computed';
import { computed } from '@ember/object';
import Service from '@ember/service';

export default Service.extend({
  isLight: true,

  isDark: not('isLight'),

  className: computed('isLight', 'isDark', function() {
    if (this.get('isLight')) {
      return 'code-theme--light';
    } else if (this.get('isDark')) {
      return 'code-theme--dark';
    }
  }),

  toggle() {
    this.toggleProperty('isLight');
  }
});
