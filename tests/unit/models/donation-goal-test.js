import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('donation-goal', 'Unit | Model | donation-goal', {
  needs: ['model:project']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('donation-goal', ['amount', 'current', 'description']);
testForBelongsTo('donation-goal', 'project');
