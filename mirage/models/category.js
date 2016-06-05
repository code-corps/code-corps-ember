import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  users: hasMany(),
  userCategories: hasMany()
});
