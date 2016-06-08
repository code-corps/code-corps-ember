import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  categories: hasMany(),
  userCategories: hasMany(),

  organizations: hasMany({ inverse: 'members' }),
  organizationMemberships: hasMany({ inverse: 'member' }),
});
