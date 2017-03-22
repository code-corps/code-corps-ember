import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/donate', 'Unit | Route | project/donate', {
  needs: [
    'service:flash-messages',
    'service:metrics',
    'service:session',
    'service:user-subscriptions'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
