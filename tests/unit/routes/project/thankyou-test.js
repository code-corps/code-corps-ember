import { moduleFor, test } from 'ember-qunit';

moduleFor('route:project/thankyou', 'Unit | Route | project/thankyou', {
  needs: ['service:metrics']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
