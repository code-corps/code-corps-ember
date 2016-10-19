import Ember from 'ember';
import OnboardingControllerMixin from 'code-corps-ember/mixins/onboarding-controller';
import { module, test } from 'qunit';

const { Object } = Ember;

module('Unit | Mixin | onboarding controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let OnboardingControllerObject = Object.extend(OnboardingControllerMixin);
  let subject = OnboardingControllerObject.create();
  assert.ok(subject);
});
