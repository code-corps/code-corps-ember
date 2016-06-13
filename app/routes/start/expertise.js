import Ember from 'ember';
import OnboardingRouteMixin from '../../mixins/onboarding-route';

export default Ember.Route.extend(OnboardingRouteMixin, {
  currentUser: Ember.inject.service(),

  beforeModel() {
    this._super(...arguments);
    let user = this.get('currentUser.user');
    return user.get('user-role');
  },

  model() {
    return this.store.findAll('role');
  },
});
