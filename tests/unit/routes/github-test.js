import { moduleFor, test } from 'ember-qunit';

moduleFor('route:github', 'Unit | Route | github', {
  needs: [
    'service:ajax',
    'service:current-user',
    'service:flash-messages',
    'service:github-state',
    'service:metrics',
    'service:session'
  ]
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
