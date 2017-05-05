import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed, computed: { filterBy, gt }, get } = Ember;

export default Model.extend({
  approved: attr(),
  canActivateDonations: attr(),
  closedTasksCount: attr('number'),
  cloudinaryPublicId: attr(),
  description: attr(),
  donationsActive: attr(),
  githubId: attr(),
  iconLargeUrl: attr(),
  iconThumbUrl: attr(),
  longDescriptionBody: attr(),
  longDescriptionMarkdown: attr(),
  openTasksCount: attr('number'),
  shouldLinkExternally: attr(),
  slug: attr(),
  title: attr(),
  totalMonthlyDonated: attr('dollar-cents'),
  website: attr(),

  donationGoals: hasMany('donation-goal', { async: true }),
  organization: belongsTo('organization', { async: true }),
  taskLists: hasMany('task-list', { async: true }),
  tasks: hasMany('tasks', { async: true }),
  projectCategories: hasMany('project-category', { async: true }),
  projectSkills: hasMany('project-skill', { async: true }),
  projectUsers: hasMany('project-user', { async: true }),
  stripeConnectPlan: belongsTo('stripe-connect-plan', { async: true }),

  currentDonationGoal: computed('_currentGoals', function() {
    return get(this, '_currentGoals.firstObject');
  }),
  hasOpenTasks: gt('openTasksCount', 0),

  _currentGoals: filterBy('donationGoals', 'current', true)
});
