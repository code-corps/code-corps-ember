import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

const {
  computed,
  Controller,
  get,
  inject: { service },
  set
} = Ember;

export default Controller.extend(OnboardingControllerMixin, {
  /**
   * disables continue button while uploading
   * @prop uploadingImage
   * @default false
   */
  uploadingImage: false,

  firstNameIsEmpty: computed.empty('model.firstName'),
  lastNameIsEmpty: computed.empty('model.lastName'),
  usersNameIsEmpty: computed.or('firstNameIsEmpty', 'lastNameIsEmpty'),

  flashMessages: service(),
  loadingBar: service(),

  uploadDone(cloudinaryPublicId) {
    let model = get(this, 'model');
    set(model, 'cloudinaryPublicId', cloudinaryPublicId);
    model.save().then(() => {
      this._stopLoadingBar();
      get(this, 'flashMessages').clearMessages().success('Photo uploaded successfully');
      set(this, 'uploadingImage', false);
    });
  },

  uploadErrored() {
    set(this, 'uploadingImage', false);
    this._stopLoadingBar();
    get(this, 'flashMessages').clearMessages().danger('Upload failed');
  },

  uploadStarted() {
    set(this, 'uploadingImage', true);
    this._startLoadingBar();
  },

  actions: {
    /**
    * Action that transitions to next route when user hits `enter` key
    * if firstName and lastName fields are populated
    *
    * @method attemptToContinue
    */
    attemptToContinue() {
      let usersNameIsEmpty = this.get('usersNameIsEmpty');
      if (!usersNameIsEmpty) {
        this.send('continue');
      }
    }
  },

  _startLoadingBar() {
    get(this, 'loadingBar').start();
  },

  _stopLoadingBar() {
    get(this, 'loadingBar').stop();
  }
});
