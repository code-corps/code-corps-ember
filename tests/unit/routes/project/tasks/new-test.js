import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/tasks/new', 'Unit | Route | project/tasks/new', {
  needs: [
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
