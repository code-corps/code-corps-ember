import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  insertedAt: attr(),
  updatedAt: attr(),

  githubAppInstallation: belongsTo('github-app-installation', { async: true }),
  organization: belongsTo('organization', { async: true })
});
