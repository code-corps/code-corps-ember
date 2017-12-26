import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  insertedAt: attr(),
  readAt: attr(),
  status: attr(),
  updatedAt: attr(),

  conversationParts: hasMany('conversation-part', { async: true }),
  message: belongsTo('message', { async: true }),
  project: belongsTo('project', { async: true }),
  user: belongsTo('user', { async: true })
});
