import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';

moduleForModel('preview', 'Unit | Model | preview', {
  // Specify the other units that are required for this test.
  needs: [
    'model:preview-user-mention',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('preview', ['body', 'markdown']);
testForBelongsTo('preview', 'user');
testForHasMany('preview', 'previewUserMentions');
