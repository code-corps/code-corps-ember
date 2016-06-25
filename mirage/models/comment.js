import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo(),
  post: belongsTo(),
  commentUserMentions: hasMany()
});
