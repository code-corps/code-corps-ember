import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  donationGoals: hasMany(),
  organization: belongsTo(),
  tasks: hasMany(),
  projectCategories: hasMany(),
  projectSkills: hasMany()
});
