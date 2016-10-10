import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  base64IconData: attr(),
  closedTasksCount: attr('number'),
  description: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  longDescriptionBody: attr(),
  longDescriptionMarkdown: attr(),
  openTasksCount: attr('number'),
  slug: attr(),
  title: attr(),

  organization: belongsTo('organization', { async: true }),
  tasks: hasMany('tasks', { async: true }),
  projectCategories: hasMany('project-category', { async: true }),
  projectSkills: hasMany('project-skill', { async: true }),

  hasOpenTasks: computed.gt('openTasksCount', 0),
  hasPendingMembers: computed.alias('organization.hasPendingMembers'),
  pendingMembersCount: computed.alias('organization.pendingMembersCount')
});
