import Ember from 'ember';

const {
  Component,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: ['user-settings-form'],

  flashMessages: service(),

  actions: {
    save() {
      let flashMessages = get(this, 'flashMessages');

      this.get('user').save().then(function() {
        flashMessages.success('Profile updated successfully');
      });
    }
  }
});
