import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  brand: attr(),
  country: attr(),
  expMonth: attr(),
  expYear: attr(),
  last4: attr(),
  name: attr(),

  user: belongsTo('user', { async: true })
});
