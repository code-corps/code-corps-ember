import { moduleFor, test } from 'ember-qunit';

moduleFor('service:conversation-channel', 'Unit | Service | conversation channel', {
  // Specify the other units that are required for this test.
  needs: [
    'service:current-user',
    'service:socket',
    'service:sounds'
  ]
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});
