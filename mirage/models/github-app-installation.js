import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  githubRepos: hasMany(),
  organizationGithubAppInstallations: hasMany(),
  project: belongsTo(),
  user: belongsTo()
});
