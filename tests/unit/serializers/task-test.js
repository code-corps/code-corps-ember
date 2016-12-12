import { moduleForModel, test } from 'ember-qunit';

moduleForModel('task', 'Unit | Serializer | task', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:task',
    'model:project',
    'model:user',
    'model:comment',
    'model:comment-user-mention',
    'model:task-list',
    'model:task-user-mention'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
