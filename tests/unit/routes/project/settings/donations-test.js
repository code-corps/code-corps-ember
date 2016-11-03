import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/settings/donations', 'Unit | Route | project/settings/donations', {
  needs: ['service:metrics']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
