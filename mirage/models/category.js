import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  projectCategories: hasMany('project-category'),
  userCategories: hasMany('user-category')
});
