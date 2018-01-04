import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  body: attr(),
  insertedAt: attr(),
  readAt: attr(),
  updatedAt: attr(),
  closedAt: attr(),

  author: belongsTo('user', { async: true }),
  conversation: belongsTo('conversation', { async: true })
});
