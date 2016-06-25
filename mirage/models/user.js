import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizations: hasMany({ inverse: 'members' }),
  organizationMemberships: hasMany({ inverse: 'member' }),

  categories: hasMany(),
  userCategories: hasMany(),
  userRoles: hasMany(),
});
