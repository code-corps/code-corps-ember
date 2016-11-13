import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import ContainsCodeMixin from '../mixins/contains-code';

export default Model.extend(ContainsCodeMixin, {
  body: attr('string'),
  insertedAt: attr('date'),
  markdown: attr('string'),

  commentUserMentions: hasMany('comment-user-mention', { async: true }),
  task: belongsTo('task', { async: true }),
  user: belongsTo('user', { async: true })
});
