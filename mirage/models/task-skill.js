import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  task: belongsTo(),
  skill: belongsTo()
});
