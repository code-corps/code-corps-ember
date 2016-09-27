import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organization: belongsTo(),
  posts: hasMany(),
  projectCategories: hasMany(),
  projectSkills: hasMany(),
});
