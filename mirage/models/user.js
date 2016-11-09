import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizationMemberships: hasMany({ inverse: 'member' }),
  subscriptions: hasMany('stripe-subscription'),
  userCategories: hasMany(),
  userRoles: hasMany(),
  UserSkills: hasMany()
});
