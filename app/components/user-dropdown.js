import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-dropdown', 'dropdown-menu', 'right'],

  session: Ember.inject.service(),

  click: function() {
    this.sendAction();
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },
  },
});
