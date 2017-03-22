import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:start/expertise', 'Unit | Controller | start/expertise', {
  needs: [
    'service:current-user',
    'service:metrics',
    'service:onboarding',
    'service:user-roles'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
