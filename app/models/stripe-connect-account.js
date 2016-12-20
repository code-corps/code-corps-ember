import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  address1: attr(),
  address2: attr(),
  businessEin: attr(),
  businessName: attr(),
  businessType: attr(),
  canAcceptDonations: attr(),
  chargesEnabled: attr(),
  city: attr(),
  country: attr(),
  displayName: attr(),
  dobDay: attr(),
  dobMonth: attr(),
  dobYear: attr(),
  email: attr(),
  firstName: attr(),
  identityDocumentId: attr(),
  idFromStripe: attr(),
  insertedAt: attr(),
  lastName: attr(),
  recipientStatus: attr(),
  recipientType: attr(),
  ssnLast4: attr(),
  state: attr(),
  updatedAt: attr(),
  verificationDocumentStatus: attr(),
  verificationFieldsNeeded: attr(),
  zip: attr(),

  organization: belongsTo('organization', { async: true })
});
