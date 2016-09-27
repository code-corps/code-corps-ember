import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  comments: hasMany(),
  commentUserMentions: hasMany(),
  postUserMentions: hasMany(),
  project: belongsTo(),
  user: belongsTo(),
});
