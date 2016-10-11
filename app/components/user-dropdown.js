import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['user-dropdown', 'dropdown-menu', 'right'],

  session: service(),

  click() {
    this.sendAction();
  },

  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
