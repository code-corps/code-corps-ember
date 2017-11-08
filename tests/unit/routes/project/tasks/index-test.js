import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/tasks/index', 'Unit | Route | project/tasks/index', {
  needs: [
    'service:metrics',
    'service:project-task-board',
    'service:router-scroll',
    'service:scheduler'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
