import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:start/interests', 'Unit | Controller | start/interests', {
  needs: [
    'service:current-user',
    'service:metrics',
    'service:onboarding',
    'service:user-categories'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
