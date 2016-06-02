import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  categories: hasMany(),
  organization: belongsTo(),
  posts: hasMany(),
});
