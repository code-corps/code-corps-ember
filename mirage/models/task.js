import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  comments: hasMany(),
  commentUserMentions: hasMany(),
  taskList: belongsTo(),
  taskUserMentions: hasMany(),
  project: belongsTo(),
  user: belongsTo()
});
