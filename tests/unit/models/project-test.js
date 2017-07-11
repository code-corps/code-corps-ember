import { moduleForModel, test } from 'ember-qunit';
import { testForAttributes } from 'code-corps-ember/tests/helpers/attributes';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import Ember from 'ember';

const {
  run
} = Ember;

moduleForModel('project', 'Unit | Model | project', {
  // Specify the other units that are required for this test.
  needs: [
    'model:donation-goal',
    'model:organization',
    'model:project-category',
    'model:project-github-repo',
    'model:project-skill',
    'model:project-user',
    'model:stripe-connect-account',
    'model:stripe-connect-plan',
    'model:task',
    'model:task-list'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('project', [
  'approved', 'canActivateDonations', 'closedTasksCount', 'cloudinaryPublicId',
  'description', 'donationsActive', 'githubId', 'iconLargeUrl', 'iconThumbUrl',
  'longDescriptionBody', 'longDescriptionMarkdown', 'openTasksCount',
  'slug', 'shouldLinkExternally', 'title', 'totalMonthlyDonated', 'website'
]);

testForBelongsTo('project', 'organization');
testForBelongsTo('project', 'stripeConnectPlan');

testForHasMany('project', 'donationGoals');
testForHasMany('project', 'projectCategories');
testForHasMany('project', 'projectGithubRepos');
testForHasMany('project', 'projectSkills');
testForHasMany('project', 'projectUsers');
testForHasMany('project', 'taskLists');
testForHasMany('project', 'tasks');

test('it should have open tasks', function(assert) {
  assert.expect(1);

  let project = this.subject({ openTasksCount: 1 });

  assert.ok(project.get('hasOpenTasks'), 'has open tasks');
});

test('it should have computed properties for its current donation goal', function(assert) {
  assert.expect(1);

  let _this = this;
  let project, currentDonationGoal;

  run(function() {
    currentDonationGoal = _this.store().createRecord('donation-goal', { project, current: true });
    project = _this.subject({ donationGoals: [currentDonationGoal] });
  });

  assert.deepEqual(project.get('currentDonationGoal'), currentDonationGoal, 'It has the right current donation goal');
});
