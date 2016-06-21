import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  user: belongsTo(),
  postUserMentions: hasMany()
});
