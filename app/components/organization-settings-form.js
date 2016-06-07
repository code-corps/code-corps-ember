import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['organization-settings-form'],

  flashMessages: Ember.inject.service(),

  actions: {
    save() {
      const flashMessages = Ember.get(this, 'flashMessages');

      this.get('organization').save()
        .then(function() {
          flashMessages.success("Organization updated successfully");
      });
    },
  },
});
