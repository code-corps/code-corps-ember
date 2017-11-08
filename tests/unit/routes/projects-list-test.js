import { moduleFor, test } from 'ember-qunit';

moduleFor('route:projects-list', 'Unit | Route | projects list', {
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
