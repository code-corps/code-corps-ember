import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-platform-customer', 'Unit | Model | stripe customer', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('stripe-platform-customer', ['email']);
testForBelongsTo('stripe-platform-customer', 'user');
