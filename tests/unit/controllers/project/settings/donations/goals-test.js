import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:project/settings/donations/goals', 'Unit | Controller | project/settings/donations/goals', {
  needs: [
    'service:metrics',
    'service:router-scroll',
    'service:scheduler'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
