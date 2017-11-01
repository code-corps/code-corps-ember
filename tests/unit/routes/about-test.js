import { moduleFor, test } from 'ember-qunit';

moduleFor('route:about', 'Unit | Route | about', {
  // Specify the other units that are required for this test.
  needs: [
    'service:metrics',
    'service:router-scroll',
    'service:scheduler'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
