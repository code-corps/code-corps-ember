import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  githubAccountAvatarUrl: attr(),
  githubAccountId: attr(),
  githubAccountLogin: attr(),
  githubAccountType: attr(),
  githubId: attr(),
  insertedAt: attr(),
  installed: attr(),
  state: attr(),
  updatedAt: attr(),

  githubRepos: hasMany('github-repo', { async: true }),
  organizationGithubAppInstallations: hasMany('organization-github-app-installation', { async: true }),
  user: belongsTo('user', { async: true })
});
