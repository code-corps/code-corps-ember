import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-dropdown'],

  session: Ember.inject.service(),

  click: function() {
    this.sendAction();
  },

  actions: {
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
