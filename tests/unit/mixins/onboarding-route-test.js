import Ember from 'ember';
import OnboardingRouteMixin from 'code-corps-ember/mixins/onboarding-route';
import { module, test } from 'qunit';

module('Unit | Mixin | onboarding route');

// Replace this with your real tests.
test('it works', function(assert) {
  let OnboardingRouteObject = Ember.Object.extend(OnboardingRouteMixin);
  let subject = OnboardingRouteObject.create();
  assert.ok(subject);
});
