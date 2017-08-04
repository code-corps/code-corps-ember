import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  donationGoals: hasMany('donation-goal'),
  organization: belongsTo(),
  projectCategories: hasMany('project-category'),
  projectGithubRepos: hasMany('project-github-repo'),
  projectSkills: hasMany('project-skill'),
  projectUsers: hasMany('project-user'),
  stripeConnectPlan: belongsTo('stripe-connect-plan'),
  taskLists: hasMany('task-list'),
  tasks: hasMany()
});
