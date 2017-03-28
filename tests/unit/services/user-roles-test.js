import { moduleFor, test } from 'ember-qunit';

moduleFor('service:user-roles', 'Unit | Service | user roles', {
  needs: [
    'service:current-user'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
