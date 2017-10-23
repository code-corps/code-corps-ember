import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  githubCreatedAt: attr(),
  githubUpdatedAt: attr(),
  htmlUrl: attr(),
  merged: attr(),
  number: attr(),
  state: attr(),

  githubRepo: belongsTo('github-repo', { async: true })
});
