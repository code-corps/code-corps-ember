import { moduleForModel, test } from 'ember-qunit';

moduleForModel('stripe-connect-subscription', 'Unit | Serializer | stripe connect subscription', {
  needs: [
    'model:project',
    'model:stripe-connect-plan',
    'model:user',
    'serializer:stripe-connect-subscription',
    'transform:dollar-cents'
  ]
});

test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});

// TODO: If snapshot contians adapter options with "stripePlatformCardId",
// serializeIntoHash should add that property into data.attributes
