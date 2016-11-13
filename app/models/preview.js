import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  body: attr('string'),
  markdown: attr('string'),

  previewUserMentions: hasMany('preview-user-mention', { async: true }),
  user: belongsTo('user', { async: true })
});
