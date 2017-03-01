import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  donationGoals: hasMany(),
  organization: belongsTo(),
  owner: belongsTo('user'),
  projectCategories: hasMany(),
  projectSkills: hasMany(),
  projectUsers: hasMany(),
  stripeConnectPlan: belongsTo(),
  taskLists: hasMany(),
  tasks: hasMany()
});
