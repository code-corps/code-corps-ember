import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  githubRepos: hasMany('github-repo'),
  organizationGithubAppInstallations: hasMany('organization-github-app-installation'),
  project: belongsTo(),
  user: belongsTo()
});
