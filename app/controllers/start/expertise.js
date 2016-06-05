import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Ember.Controller.extend(OnboardingControllerMixin, {
  currentUser: Ember.inject.service(),

  user: Ember.computed.alias('currentUser.user'),
});
