import { moduleFor, test } from 'ember-qunit';

moduleFor('route:terms', 'Unit | Route | terms', {
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
