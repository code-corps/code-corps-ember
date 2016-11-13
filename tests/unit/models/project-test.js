import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

const {
  get,
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
    'model:task',
    'model:user'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.store().modelFor('project');
  let actualAttributes = get(model, 'attributes');

  let expectedAttributes = [
    'base64IconData',
    'closedTasksCount',
    'description',
    'iconLargeUrl',
    'iconThumbUrl',
    'longDescriptionBody',
    'longDescriptionMarkdown',
    'openTasksCount',
    'slug',
    'title'
  ];

  assert.hasAttributes(actualAttributes, expectedAttributes);
});

testForBelongsTo('project', 'organization');
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
