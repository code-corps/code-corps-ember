import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/people', 'Unit | Route | project/people', {
  // Specify the other units that are required for this test.
  needs: [
    'service:can',
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
