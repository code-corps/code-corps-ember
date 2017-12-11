import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  message: belongsTo(),
  user: belongsTo(),
  conversationParts: hasMany()
});
