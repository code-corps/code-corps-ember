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
  name: attr(),
  syncState: attr(),
  syncingCommentsCount: attr(),
  syncingIssuesCount: attr(),
  syncingPullRequestsCount: attr(),
  updatedAt: attr(),

  /**
    `triggeredSync` is a virtual (client-only) attribute used to let the client
    know when the repo sync has been triggered.

    @attribute triggeredSync
    @virtual
    @type boolean
   */
  triggeredSync: attr(),

  githubAppInstallation: belongsTo('github-app-installation', { async: true }),
  projectGithubRepos: hasMany('project-github-repo', { async: true })
});
