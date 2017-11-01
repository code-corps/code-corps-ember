import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:project/checkout', 'Unit | Controller | project/checkout', {
  // Specify the other units that are required for this test.
  needs: [
    'service:current-user',
    'service:metrics',
    'service:router-scroll',
    'service:scheduler',
    'service:session',
    'service:stripev3'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
