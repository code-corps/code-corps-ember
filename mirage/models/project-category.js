import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  category: belongsTo(),
  project: belongsTo()
});
