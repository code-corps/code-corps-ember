import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';

moduleForModel('task-user-mention', 'Unit | Model | task user mention', {
  // Specify the other units that are required for this test.
  needs: [
    'model:task',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('task-user-mention', ['indices', 'username']);
