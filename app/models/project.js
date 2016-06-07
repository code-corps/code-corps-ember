import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  base64IconData: attr('string'),
  description: attr('string'),
  iconLargeUrl: attr('string'),
  iconThumbUrl: attr('string'),
  slug: attr('string'),
  title: attr('string'),

  categories: hasMany('categories', { async: true }),
  organization: belongsTo('organization', { async: true }),
  posts: hasMany('posts', { async: true }),
});
