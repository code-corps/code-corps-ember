import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  description: attr('string'),
  name: attr('string'),
  slug: attr('string'),

  userCategories: hasMany('user-category', { async: true }),
  projectCategories: hasMany('project-category', { async: true }),
});
