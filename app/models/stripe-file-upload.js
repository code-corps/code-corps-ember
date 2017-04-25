import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  created: attr(),
  idFromStripe: attr(),
  insertedAt: attr(),
  purpose: attr(),
  size: attr(),
  type: attr(),
  url: attr(),

  // Virtual attribute, for upload
  verificationDocumentId: attr(),

  stripeConnectAccount: belongsTo('stripe-connect-account', { async: true })
});
