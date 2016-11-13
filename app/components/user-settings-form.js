import Ember from 'ember';

const {
  Component,
  get,
  inject: { service }
} = Ember;

/**
  `user-settings-form` composes the form for changing a user's settings

  ```handlebars
  {{user-settings-form user=model}}
  ```

  @class user-settings-form
  @module Component
  @extends Ember.Component
 */
export default Component.extend({
  classNames: ['user-settings-form'],

  /**
    @property flashMessages
    @type Ember.Service
   */
  flashMessages: service(),

  actions: {
    /**
      Action to save the user's settings.

      @method save
     */
    save() {
      let flashMessages = get(this, 'flashMessages');

      this.get('user').save().then(function() {
        flashMessages.success('Profile updated successfully');
      });
    }
  }
});
