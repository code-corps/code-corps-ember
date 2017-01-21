import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

const {
  Controller,
  inject: { service }
} = Ember;

export default Controller.extend(OnboardingControllerMixin, {
  userRoles: service()
});
