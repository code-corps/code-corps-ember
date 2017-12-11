import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  body: attr(),
  initiatedBy: attr(),
  insertedAt: attr(),
  subject: attr(),
  updatedAt: attr(),

  author: belongsTo('user', { async: true }),
  project: belongsTo('project', { async: true }),

  conversations: hasMany('conversation', { aync: true })
});
