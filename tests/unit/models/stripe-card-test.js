import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-card', 'Unit | Model | stripe card', {
  // Specify the other units that are required for this test.
  needs: [
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('stripe-card',
  ['brand', 'country', 'expMonth', 'expYear', 'last4', 'name']
);
testForBelongsTo('stripe-card', 'user');
