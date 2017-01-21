import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-connect-plan', 'Unit | Model | stripe connect plan', {
  needs: ['model:project']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForBelongsTo('stripe-connect-plan', 'project');
