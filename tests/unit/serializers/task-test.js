import { moduleForModel, test } from 'ember-qunit';

moduleForModel('task', 'Unit | Serializer | task', {
  // Specify the other units that are required for this test.
  needs: [
    'model:comment',
    'model:comment-user-mention',
    'model:github-repo',
    'model:project',
    'model:task-list',
    'model:task-skill',
    'model:task-user-mention',
    'model:user',
    'model:user-task',
    'serializer:task'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
