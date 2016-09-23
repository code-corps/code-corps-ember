import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  organizationMemberships: hasMany(),
  projects: hasMany(),
  sluggedRoute: belongsTo
});
