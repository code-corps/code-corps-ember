import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  email: attr(),

  recipientType: attr(),

  firstName: attr(),
  lastName: attr(),

  dobDay: attr(),
  dobMonth: attr(),
  dobYear: attr(),

  address1: attr(),
  address2: attr(),
  city: attr(),
  country: attr(),
  state: attr(),
  zip: attr(),

  ssnLast4: attr(),

  businessEin: attr(),
  businessName: attr(),
  businessType: attr(),

  canAcceptDonations: attr(),
  chargesEnabled: attr(),

  displayName: attr(),
  idFromStripe: attr(),

  insertedAt: attr(),
  updatedAt: attr(),

  organization: belongsTo('organization', { async: true })
});
