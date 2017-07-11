import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  githubAccountAvatarUrl: attr(),
  githubAccountId: attr(),
  githubAccountLogin: attr(),
  githubAccountType: attr(),
  githubId: attr(),
  insertedAt: attr(),
  name: attr(),
  updatedAt: attr(),

  githubAppInstallation: belongsTo('github-app-installation', { async: true })
});
