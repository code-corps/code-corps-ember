import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  preview: belongsTo(),
  user: belongsTo()
});
