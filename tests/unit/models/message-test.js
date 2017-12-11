import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo, testForHasMany } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('message', 'Unit | Model | message', {
  // Specify the other units that are required for this test.
  needs: [
    'model:conversation',
    'model:project',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('message', ['body', 'initiatedBy', 'insertedAt', 'subject', 'updatedAt']);
testForBelongsTo('message', 'author');
testForBelongsTo('message', 'project');
testForHasMany('message', 'conversations');
