import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/settings/donations/goals', 'Unit | Route | project/settings/donations/goals', {
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
