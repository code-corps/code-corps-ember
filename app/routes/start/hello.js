import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend(OnboardingRouteMixin, {
  currentUser: service(),

  model() {
    return this.get('currentUser.user');
  }
});
