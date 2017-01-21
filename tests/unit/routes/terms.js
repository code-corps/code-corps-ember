import { moduleFor, test } from 'ember-qunit';

moduleFor('route:terms', 'Unit | Route | terms', {
  needs: ['service:metrics']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
