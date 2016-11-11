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
    'model:organization-membership',
    'model:project-category',
    'model:project-skill',
    'model:stripe-connect-account',
    'model:stripe-plan',
    'model:task',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

testForAttributes('project', [
  'base64IconData', 'closedTasksCount', 'description', 'iconLargeUrl', 'iconThumbUrl',
  'longDescriptionBody', 'longDescriptionMarkdown', 'openTasksCount', 'slug', 'title'
]);

testForBelongsTo('project', 'organization');
testForBelongsTo('project', 'stripePlan');

testForHasMany('project', 'tasks');
testForHasMany('project', 'projectCategories');
testForHasMany('project', 'projectSkills');

test('it should have open tasks', function(assert) {
  assert.expect(1);

  let project = this.subject({ openTasksCount: 1 });

  assert.equal(project.get('hasOpenTasks'), true, 'has open tasks');
});

test('it should have computed properties for its organization\'s members', function(assert) {
  assert.expect(2);

  let _this = this;
  let project;

  run(function() {
    let organization = _this.store().createRecord('organization');
    _this.store().createRecord('organization-membership', { organization, role: 'pending' });

    project = _this.subject({ organization });
  });

  assert.equal(project.get('pendingMembersCount'), 1, 'pendingMembersCount should return 1');
  assert.equal(project.get('hasPendingMembers'), true, 'hasPendingMembers should return true');
});
