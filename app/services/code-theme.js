import Ember from 'ember';

const {
  computed,
  get,
  Service
} = Ember;

export default Service.extend({
  isLight: true,

  isDark: computed.not('isLight'),

  className: computed('isLight', 'isDark', function() {
    if (get(this, 'isLight')) {
      return 'code-theme--light';
    } else if (get(this, 'isDark')) {
      return 'code-theme--dark';
    }
  }),

  toggle() {
    this.toggleProperty('isLight');
  }
});
