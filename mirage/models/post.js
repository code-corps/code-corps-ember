import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo(),
  project: belongsTo(),
  comments: hasMany(),
  commentUserMentions: hasMany(),
  postUserMentions: hasMany(),
});
