import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

const { get, Route } = Ember;

export default Route.extend(OnboardingRouteMixin, {
  model() {
    return get(this, 'currentUser.user.userSkills');
  }
});
