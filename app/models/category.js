import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  name: attr('string'),
  slug: attr('string'),
  description: attr('string'),
  users: hasMany('user', { async: true }),
  userCategories: hasMany('user-category', { async: true }),
});
