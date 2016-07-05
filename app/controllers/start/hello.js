import Ember from 'ember';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Ember.Controller.extend(OnboardingControllerMixin, {
  firstNameIsEmpty: Ember.computed.empty('model.firstName'),
  lastNameIsEmpty: Ember.computed.empty('model.lastName'),
  usersNameIsEmpty: Ember.computed.or('firstNameIsEmpty', 'lastNameIsEmpty'),
});
