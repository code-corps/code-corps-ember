import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

export default Ember.Route.extend(OnboardingRouteMixin, {
  currentUser: Ember.inject.service(),

  model() {
    return this.get('currentUser.user');
  },
});
