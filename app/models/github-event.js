import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { computed, get } from '@ember/object';

export default Model.extend({
  action: attr(),
  error: attr(),
  eventType: attr(),
  failureReason: attr(),
  githubDeliveryId: attr(),
  insertedAt: attr('date'),
  payload: attr(),
  recordData: attr(),
  status: attr(),
  updatedAt: attr('date'),

  retry: attr(), // virtual attr

  prettyPayload: computed('payload', function() {
    let payload = get(this, 'payload');
    return JSON.stringify(payload, null, 2);
  })
});
