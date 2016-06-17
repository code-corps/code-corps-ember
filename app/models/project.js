import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  base64IconData: attr(),
  description: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  longDescriptionBody: attr(),
  longDescriptionMarkdown: attr(),
  slug: attr(),
  title: attr(),

  categories: hasMany('categories', { async: true }),
  organization: belongsTo('organization', { async: true }),
  posts: hasMany('posts', { async: true }),
});
