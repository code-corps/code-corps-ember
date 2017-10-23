import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  githubAppInstallations: hasMany('github-app-installation'),
  projectUsers: hasMany(),
  sluggedRoute: belongsTo(),
  stripeConnectSubscriptions: hasMany('stripe-connect-subscription'),
  stripePlatformCard: belongsTo('stripe-platform-card'),
  stripePlatformCustomer: belongsTo('stripe-platform-customer'),
  userCategories: hasMany('user-category'),
  userRoles: hasMany('user-role'),
  userSkills: hasMany('user-skill')
});
