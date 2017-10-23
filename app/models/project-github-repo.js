import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  insertedAt: attr(),
  updatedAt: attr(),

  githubRepo: belongsTo('github-repo', { async: true }),
  project: belongsTo('project', { async: true })
});
