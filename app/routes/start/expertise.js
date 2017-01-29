import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

const {
  get,
  inject: { service },
  Route
} = Ember;

export default Route.extend(OnboardingRouteMixin, {
  currentUser: service(),

  beforeModel() {
    this._super(...arguments);
    let user = get(this, 'currentUser.user');
    return get(user, 'user-role');
  },

  model() {
    return this.store.findAll('role');
  }
});
