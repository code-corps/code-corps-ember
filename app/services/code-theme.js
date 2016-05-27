import Ember from 'ember';

export default Ember.Service.extend({
  isLight: true,
  isDark: Ember.computed.not('isLight'),

  className: Ember.computed('isLight', 'isDark', function() {
    if(this.get('isLight')) {
      return 'light';
    } else if(this.get('isDark')) {
      return 'dark';
    }
  }),

  toggle() {
    this.toggleProperty('isLight');
  }
});
