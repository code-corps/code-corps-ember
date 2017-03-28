import { moduleFor, test } from 'ember-qunit';

moduleFor('service:user-skills-list', 'Unit | Service | user skills list', {
  // Specify the other units that are required for this test.
  needs: [
    'service:current-user'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
