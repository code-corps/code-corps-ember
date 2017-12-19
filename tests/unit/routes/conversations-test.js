import { moduleFor, test } from 'ember-qunit';

moduleFor('route:conversations', 'Unit | Route | conversations', {
  // Specify the other units that are required for this test.
  needs: [
    'service:conversations',
    'service:current-user',
    'service:metrics',
    'service:router-scroll',
    'service:scheduler',
    'service:session'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
