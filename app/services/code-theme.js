import Ember from 'ember';

const {
  computed,
  Service
} = Ember;

export default Service.extend({
  isLight: true,

  isDark: computed.not('isLight'),

  className: computed('isLight', 'isDark', function() {
    if (this.get('isLight')) {
      return 'light';
    } else if (this.get('isDark')) {
      return 'dark';
    }
  }),

  toggle() {
    this.toggleProperty('isLight');
  }
});
