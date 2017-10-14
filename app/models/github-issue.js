import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  body: attr(),
  closedAt: attr(),
  commentsUrl: attr(),
  eventsUrl: attr(),
  githubCreatedAt: attr(),
  githubId: attr(),
  githubUpdatedAt: attr(),
  htmlUrl: attr(),
  labelsUrl: attr(),
  locked: attr(),
  number: attr(),
  state: attr(),
  title: attr(),
  url: attr(),

  githubRepo: belongsTo('github-repo', { async: true })
});
