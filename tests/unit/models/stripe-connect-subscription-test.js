import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-connect-subscription', 'Unit | Model | stripe connect subscription', {
  needs: [
    'model:project',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('stripe-connect-subscription', ['quantity']);

testForBelongsTo('stripe-connect-subscription', 'project');
testForBelongsTo('stripe-connect-subscription', 'user');
