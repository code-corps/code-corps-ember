import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Ember.Controller.extend(OnboardingControllerMixin, {
  userCategories: Ember.inject.service(),
});
