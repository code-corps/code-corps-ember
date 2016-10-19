import { moduleFor, test } from 'ember-qunit';

moduleFor('route:terms-of-use', 'Unit | Route | terms of use', {
  needs: ['service:metrics']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
