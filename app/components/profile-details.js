import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['profile-details'],

  actions: {
    cancel() {
      this.get('user').rollback();
    },

    save() {
      const flashMessages = Ember.get(this, 'flashMessages');

      this.get('user').save()
      .then(function() {
        flashMessages.success("Profile updated successfully");
      });
    },
  }
});
