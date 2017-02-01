import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
  set
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
  loadingBar: service(),

  uploadDone(cloudinaryPublicId) {
    let user = get(this, 'user');
    set(user, 'cloudinaryPublicId', cloudinaryPublicId);
    user.save().then(() => {
      this._stopLoadingBar();
      get(this, 'flashMessages').clearMessages().success('Photo uploaded successfully');
    });
  },

  uploadErrored() {
    this._stopLoadingBar();
    get(this, 'flashMessages').clearMessages().danger('Upload failed');
  },

  uploadStarted() {
    this._startLoadingBar();
  },

  actions: {
    /**
      Action to save the user's settings.

      @method save
     */
    save() {
      get(this, 'user').save().then(() => {
        get(this, 'flashMessages').clearMessages().success('Profile updated successfully');
      });
    }
  },

  _startLoadingBar() {
    get(this, 'loadingBar').start();
  },

  _stopLoadingBar() {
    get(this, 'loadingBar').stop();
  }
});
