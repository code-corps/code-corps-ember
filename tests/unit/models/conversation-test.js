import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';
import { run } from '@ember/runloop';

moduleForModel('conversation', 'Unit | Model | conversation', {
  needs: [
    'model:conversation',
    'model:conversation-part',
    'model:message',
    'model:user'
  ]
});

test('sortedConversationParts sorts insertedAt by asc', function(assert) {
  let laterPart, earlierPart;
  run(() => {
    laterPart = this.store().createRecord('conversation-part', { body: 'wat', insertedAt: new Date('2017-10-07') });
    earlierPart = this.store().createRecord('conversation-part', { body: 'foo', insertedAt: new Date('2017-10-06') });
  });
  let model = this.subject({ conversationParts: [laterPart, earlierPart] });
  assert.equal(model.get('sortedConversationParts.length'), 2);
  assert.equal(model.get('sortedConversationParts').get('firstObject').get('body'),
    earlierPart.get('body'),
    'the first conversation part is the earlier one');
  assert.equal(model.get('sortedConversationParts').get('lastObject').get('body'),
    laterPart.get('body'),
    'the secont conversation part is the later one');
});

testForAttributes('conversation', ['insertedAt', 'readAt', 'status', 'updatedAt']);
testForBelongsTo('conversation', 'message');
testForBelongsTo('conversation', 'project');
testForBelongsTo('conversation', 'user');
