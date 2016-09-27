import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  commentUserMentions: hasMany(),
  post: belongsTo(),
  user: belongsTo(),
});
