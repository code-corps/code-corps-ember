import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['user-dropdown', 'dropdown-menu', 'right'],

  session: service(),

  click: function() {
    this.sendAction();
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    },
  },
});
