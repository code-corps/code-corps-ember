import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

export default Ember.Route.extend(OnboardingRouteMixin, {
  model() {
    return this.get('currentUser.user.userSkills');
  },
});
