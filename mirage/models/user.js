import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  organizationMemberships: hasMany({ inverse: 'member' }),
  userCategories: hasMany(),
  userRoles: hasMany(),
  UserSkills: hasMany()
});
