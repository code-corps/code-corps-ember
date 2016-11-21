import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';

moduleForModel('preview-user-mention', 'Unit | Model | preview user mention', {
  // Specify the other units that are required for this test.
  needs: [
    'model:preview',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('preview-user-mention', ['indices', 'username']);
