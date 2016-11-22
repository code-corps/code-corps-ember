import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizationMemberships: hasMany({ inverse: 'member' }),
  stripePlatformCards: hasMany('stripe-platform-card'),
  subscriptions: hasMany('stripe-subscription'),
  userCategories: hasMany(),
  userRoles: hasMany(),
  userSkills: hasMany()
});
