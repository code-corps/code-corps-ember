import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  ownerType: attr('string'),
  slug: attr('string'),

  owner: belongsTo('owner', { async: true, polymorphic: true }),
});
