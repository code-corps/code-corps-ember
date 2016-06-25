import { moduleForModel, test } from 'ember-qunit';

moduleForModel('post', 'Unit | Serializer | post', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:post',
    'model:project',
    'model:user',
    'model:comment',
    'model:comment-user-mention',
    'model:post-user-mention'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
