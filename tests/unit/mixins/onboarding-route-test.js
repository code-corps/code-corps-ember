import Ember from 'ember';
import OnboardingRouteMixin from 'code-corps-ember/mixins/onboarding-route';
import { module, test } from 'qunit';

const { Object } = Ember;

module('Unit | Mixin | onboarding route');

// Replace this with your real tests.
test('it works', function(assert) {
  let OnboardingRouteObject = Object.extend(OnboardingRouteMixin);
  let subject = OnboardingRouteObject.create();
  assert.ok(subject);
});
