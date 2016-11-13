import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  previewUserMentions: hasMany(),
  user: belongsTo()
});
