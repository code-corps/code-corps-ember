import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:project/settings/donations/payments', 'Unit | Controller | project/settings/donations/payments', {
  needs: [
    'service:current-user',
    'service:metrics',
    'service:stripe'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
