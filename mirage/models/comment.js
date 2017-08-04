import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  commentUserMentions: hasMany('comment-user-mention'),
  task: belongsTo(),
  user: belongsTo()
});
