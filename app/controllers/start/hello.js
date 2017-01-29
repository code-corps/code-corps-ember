import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

const {
  computed,
  Controller,
  get
} = Ember;

export default Controller.extend(OnboardingControllerMixin, {
  firstNameIsEmpty: computed.empty('model.firstName'),
  lastNameIsEmpty: computed.empty('model.lastName'),
  usersNameIsEmpty: computed.or('firstNameIsEmpty', 'lastNameIsEmpty'),

  actions: {
    /**
    * Action that transitions to next route when user hits `enter` key
    * if firstName and lastName fields are populated
    *
    * @method attemptToContinue
    */
    attemptToContinue() {
      let usersNameIsEmpty = get(this, 'usersNameIsEmpty');
      if (!usersNameIsEmpty) {
        this.send('continue');
      }
    }
  }
});
