import { moduleFor, test } from 'ember-qunit';

moduleFor('route:login', 'Unit | Route | login', {
  // Specify the other units that are required for this test.
  needs: [
    'service:metrics',
    'service:router-scroll',
    'service:scheduler',
    'service:session',
    'service:site-footer'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
