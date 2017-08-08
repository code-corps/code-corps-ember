import { Model, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  githubRepo: belongsTo('github-repo'),
  project: belongsTo()
});
