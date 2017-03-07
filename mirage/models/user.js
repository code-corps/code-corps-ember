import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  projectUsers: hasMany(),
  sluggedRoute: belongsTo(),
  stripePlatformCard: belongsTo('stripe-platform-card'),
  stripePlatformCustomer: belongsTo('stripe-platform-customer'),
  stripeConnectSubscriptions: hasMany('stripe-connect-subscription'),
  userCategories: hasMany(),
  userRoles: hasMany(),
  userSkills: hasMany()
});
