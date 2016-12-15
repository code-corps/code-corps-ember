import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';

moduleForModel('task-list', 'Unit | Model | task list', {
  // Specify the other units that are required for this test.
  needs: [
    'model:project',
    'model:task'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('task-list', ['name', 'order', 'position']);
testForBelongsTo('task-list', 'project');
testForHasMany('task-list', 'tasks');
