import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  commentUserMentions: hasMany(),
  task: belongsTo(),
  user: belongsTo()
});
