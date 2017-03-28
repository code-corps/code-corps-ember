import { moduleFor, test } from 'ember-qunit';

moduleFor('route:start/skills', 'Unit | Route | start/skills', {
  // Specify the other units that are required for this test.
  needs: [
    'service:current-user',
    'service:metrics',
    'service:session',
    'service:user-skills-list'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
