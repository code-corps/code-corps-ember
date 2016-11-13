import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  skill: belongsTo(),
  user: belongsTo()
});
