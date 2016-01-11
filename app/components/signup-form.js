import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['signup-form'],

  store: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('user', this.get('store').createRecord('user'));
  },

  actions: {
    signup() {
      this.get('user').save();
    }
  }
});
