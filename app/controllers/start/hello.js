import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Ember.Controller.extend(OnboardingControllerMixin, {
  firstNameIsEmpty: Ember.computed.empty('model.firstName'),
  lastNameIsEmpty: Ember.computed.empty('model.lastName'),
  usersNameIsEmpty: Ember.computed.or('firstNameIsEmpty', 'lastNameIsEmpty'),

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
  }
});
