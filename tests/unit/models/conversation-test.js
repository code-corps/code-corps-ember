import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('conversation', 'Unit | Model | conversation', {
  // Specify the other units that are required for this test.
  needs: [
    'model:message',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('conversation', ['insertedAt', 'readAt', 'status', 'updatedAt']);
testForBelongsTo('conversation', 'message');
testForBelongsTo('conversation', 'user');
