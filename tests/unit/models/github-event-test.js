import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';

moduleForModel('github-event', 'Unit | Model | github event', {
  needs: []
});

testForAttributes('github-event', [
  'action',
  'error',
  'eventType',
  'failureReason',
  'githubDeliveryId',
  'insertedAt',
  'payload',
  'recordData',
  'status',
  'updatedAt'
]);

test('it correctly pretty prints the JSON payload', function(assert) {
  assert.expect(1);

  let model = this.subject({ payload: { 'key': 'value' } });

  assert.equal(model.get('prettyPayload'), '{\n  "key": "value"\n}');
});
