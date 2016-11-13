import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import OnboardingRouteMixin from '../mixins/onboarding-route';

const { Route } = Ember;

export default Route.extend(OnboardingRouteMixin, AuthenticatedRouteMixin, { });
