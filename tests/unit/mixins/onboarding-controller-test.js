import Object from '@ember/object';
import OnboardingControllerMixin from 'code-corps-ember/mixins/onboarding-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | onboarding controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let OnboardingControllerObject = Object.extend(OnboardingControllerMixin);
  let subject = OnboardingControllerObject.create();
  assert.ok(subject);
});
