import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import OnboardingRouteMixin from '../mixins/onboarding-route';

export default Ember.Route.extend(OnboardingRouteMixin, AuthenticatedRouteMixin, {
});
