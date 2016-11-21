import { moduleForModel, test } from 'ember-qunit';

moduleForModel('stripe-subscription', 'Unit | Serializer | stripe subscription', {
  needs: [
    'serializer:stripe-subscription',
    'model:project',
    'model:user',
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
