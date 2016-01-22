import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo(),
  organization: belongsTo(),

  posts: hasMany()
});
