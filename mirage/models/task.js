import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  comments: hasMany(),
  commentUserMentions: hasMany('comment-user-mention'),
  githubRepo: belongsTo(),
  taskList: belongsTo(),
  taskUserMentions: hasMany('task-user-mention'),
  project: belongsTo(),
  user: belongsTo(),
  userTask: belongsTo()
});
