import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  githubRepo: belongsTo(),
  project: belongsTo()
});
