import { gt, filterBy } from '@ember/object/computed';
import { get, computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

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
  projectGithubRepos: hasMany('project-github-repo', { async: true }),
  projectSkills: hasMany('project-skill', { async: true }),
  projectUsers: hasMany('project-user', { async: true }),
  stripeConnectPlan: belongsTo('stripe-connect-plan', { async: true }),

  currentDonationGoal: computed('_currentGoals', function() {
    return get(this, '_currentGoals.firstObject');
  }),
  hasOpenTasks: gt('openTasksCount', 0),

  _currentGoals: filterBy('donationGoals', 'current', true)
});
