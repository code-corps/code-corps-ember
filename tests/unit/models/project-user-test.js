import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from '../../helpers/relationship';

moduleForModel('project-user', 'Unit | Model | project user', {
  needs: [
    'model:project',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('project-user', ['role']);
testForBelongsTo('project-user', 'project');
testForBelongsTo('project-user', 'user');
