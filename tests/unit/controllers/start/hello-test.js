import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:start/hello', 'Unit | Controller | start/hello', {
  needs: [
    'service:current-user',
    'service:flash-messages',
    'service:loading-bar',
    'service:metrics',
    'service:onboarding'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
