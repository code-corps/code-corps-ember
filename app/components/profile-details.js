import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['profile-details'],

  actions: {
    save() {
      const flashMessages = Ember.get(this, 'flashMessages');

      this.get('user').save()
      .then(function() {
        flashMessages.success("Profile updated successfully");
      });
    },
  }
});
