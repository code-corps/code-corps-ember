import { moduleForModel, test } from 'ember-qunit';

moduleForModel('comment', 'Unit | Serializer | comment', {
  // Specify the other units that are required for this test.
  needs: [
    'serializer:comment',
    'model:post',
    'model:user',
    'model:comment-user-mention'
  ]
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
