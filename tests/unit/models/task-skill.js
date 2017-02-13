import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('task-skill', 'Unit | Model | task skill', {
  // Specify the other units that are required for this test.
  needs: ['model:task', 'model:skill']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForBelongsTo('task-skill', 'task');
testForBelongsTo('task-skill', 'skill');
