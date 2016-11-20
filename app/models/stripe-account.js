import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  businessName: attr(),
  businessUrl: attr(),
  chargesEnabled: attr(),
  displayName: attr(),
  email: attr(),
  idFromStripe: attr(),
  insertedAt: attr(),
  updatedAt: attr(),

  organization: belongsTo('organization', { async: true })
});
