import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/tasks/task', 'Unit | Route | project/tasks/task', {
  needs: [
    'service:current-user',
    'service:metrics',
    'service:task-skills-list'
  ]
});

test('it exists', function(assert) {
  let route = this.subject({
    // The store cannot be added as a dependency through `needs` in unit tests,
    // so we inject it this way.
    store: {}
  });
  assert.ok(route);
});
