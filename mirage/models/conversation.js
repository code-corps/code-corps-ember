import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  message: belongsTo(),
  user: belongsTo()
});
