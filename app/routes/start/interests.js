import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

const { Route } = Ember;

export default Route.extend(OnboardingRouteMixin, {
  model() {
    return this.store.findAll('category');
  }
});
