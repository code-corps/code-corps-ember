import { moduleFor, test } from 'ember-qunit';

moduleFor('route:conversations/index', 'Unit | Route | conversations/index', {
  // Specify the other units that are required for this test.
  needs: [
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
