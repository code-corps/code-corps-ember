import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-settings-form'],

  flashMessages: Ember.inject.service(),

  actions: {
    save() {
      const flashMessages = Ember.get(this, 'flashMessages');

      this.get('project').save()
        .then(function() {
          flashMessages.success("Project updated successfully");
      });
    },
  }});
