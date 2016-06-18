import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Ember.Controller.extend(OnboardingControllerMixin, {
  usersNameIsEmpty: Ember.computed.empty('model.name'),
});
