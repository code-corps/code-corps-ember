import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';

moduleForModel('comment-user-mention', 'Unit | Model | comment user mention', {
  // Specify the other units that are required for this test.
  needs: [
    'model:comment',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('comment-user-mention', ['indices', 'username']);
