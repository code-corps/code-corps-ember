import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, get } = Ember;

export default Model.extend({
  base64IconData: attr(),
  closedTasksCount: attr('number'),
  description: attr(),
  donationsActive: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  longDescriptionBody: attr(),
  longDescriptionMarkdown: attr(),
  openTasksCount: attr('number'),
  slug: attr(),
  title: attr(),
  totalMonthlyDonated: attr('dollar-cents'),

  donationGoals: hasMany('donation-goal', { async: true }),
  organization: belongsTo('organization', { async: true }),
  taskLists: hasMany('task-list', { async: true }),
  tasks: hasMany('tasks', { async: true }),
  projectCategories: hasMany('project-category', { async: true }),
  projectSkills: hasMany('project-skill', { async: true }),
  stripeConnectPlan: belongsTo('stripe-connect-plan', { async: true }),

  currentDonationGoal: computed('_currentGoals', function() {
    return get(this, '_currentGoals.firstObject');
  }),
  hasOpenTasks: computed.gt('openTasksCount', 0),
  hasPendingMembers: computed.alias('organization.hasPendingMembers'),
  pendingMembersCount: computed.alias('organization.pendingMembersCount'),

  _currentGoals: computed.filterBy('donationGoals', 'current', true)
});
