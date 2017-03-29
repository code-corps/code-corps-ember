import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  projectUsers: hasMany(),
  sluggedRoute: belongsTo(),
  stripeConnectSubscriptions: hasMany('stripe-connect-subscription'),
  stripePlatformCard: belongsTo('stripe-platform-card'),
  stripePlatformCustomer: belongsTo('stripe-platform-customer'),
  userCategories: hasMany(),
  userRoles: hasMany(),
  userSkills: hasMany()
});
