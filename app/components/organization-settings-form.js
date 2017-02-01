import Ember from 'ember';

const {
  Component,
  get,
  inject: { service },
  set
} = Ember;

export default Component.extend({
  classNames: ['organization-settings-form', 'settings-form'],

  flashMessages: service(),
  loadingBar: service(),

  uploadDone(cloudinaryPublicId) {
    let organization = get(this, 'organization');
    set(organization, 'cloudinaryPublicId', cloudinaryPublicId);
    organization.save().then(() => {
      this._stopLoadingBar();
      get(this, 'flashMessages').clearMessages().success('Organization icon uploaded successfully');
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
    save() {
      get(this, 'organization').save().then(() => {
        get(this, 'flashMessages').clearMessages().success('Organization updated successfully');
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
