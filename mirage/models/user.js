import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizationMemberships: hasMany({ inverse: 'member' }),
  categories: hasMany(),
  userCategories: hasMany(),
  userRoles: hasMany(),
});
