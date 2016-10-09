import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('project-skill', 'Unit | Model | project skill', {
  // Specify the other units that are required for this test.
  needs: ['model:project', 'model:skill']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

testForBelongsTo('project-skill', 'project');
testForBelongsTo('project-skill', 'skill');
