import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

const { get, inject: { service }, Route } = Ember;

export default Route.extend(OnboardingRouteMixin, {
  currentUser: service(),

  model() {
    return get(this, 'currentUser.user.userSkills');
  }
});
