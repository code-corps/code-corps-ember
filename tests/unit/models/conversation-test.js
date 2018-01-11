import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';
import { run } from '@ember/runloop';

moduleForModel('conversation', 'Unit | Model | conversation', {
  needs: [
    'model:message',
    'model:conversation',
    'model:conversation-part',
    'model:user'
  ]
});

test('sortedConversationParts sorts insertedAt by asc', function(assert) {
  let firstPart, secondPart;
  run(() => {
    firstPart = this.store().createRecord('conversation-part', { body: 'wat', insertedAt: new Date('2017-10-07') });
    secondPart = this.store().createRecord('conversation-part', { body: 'foo', insertedAt: new Date('2017-10-06') });
  });
  let model = this.subject({ conversationParts: [firstPart, secondPart] });
  assert.equal(model.get('sortedConversationParts.length'), 2);
  assert.equal(model.get('sortedConversationParts').get('firstObject').get('body'), 'foo');
  assert.equal(model.get('sortedConversationParts').get('lastObject').get('body'), 'wat');
});

testForAttributes('conversation', ['insertedAt', 'readAt', 'status', 'updatedAt']);
testForBelongsTo('conversation', 'message');
testForBelongsTo('conversation', 'project');
testForBelongsTo('conversation', 'user');
