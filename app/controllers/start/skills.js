import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

const {
  computed,
  Controller,
  inject: { service }
} = Ember;

export default Controller.extend(OnboardingControllerMixin, {
  currentUser: service(),
  userSkills: service(),

  user: computed.alias('currentUser.user')
});
