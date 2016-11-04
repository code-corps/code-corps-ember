import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-subscription', 'Unit | Model | stripe subscription', {
  needs: ['model:project', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('stripe-subscription', ['amount']);
testForBelongsTo('stripe-subscription', 'project');
testForBelongsTo('stripe-subscription', 'user');
