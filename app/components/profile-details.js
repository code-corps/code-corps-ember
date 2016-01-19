import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['profile-details'],

  actions: {
    cancel() {
      this.get('user').rollback();
    },

    save() {
      this.get('user').save();
    },
  }
});
