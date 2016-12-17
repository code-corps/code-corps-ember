import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo } from 'code-corps-ember/tests/helpers/relationship';

moduleForModel('stripe-file-upload', 'Unit | Model | stripe file upload', {
  needs: ['model:stripe-connect-account']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('stripe-file-upload', [
  'created', 'field', 'idFromStripe', 'insertedAt', 'purpose', 'size', 'type',
  'url'
]);
testForBelongsTo('stripe-file-upload', 'stripeConnectAccount');
