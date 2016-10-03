import { moduleForModel, test } from 'ember-qunit';
import { testForBelongsTo, testForHasMany } from '../../helpers/relationship';
import '../../helpers/has-attributes';
import Ember from 'ember';

moduleForModel('project', 'Unit | Model | project', {
  // Specify the other units that are required for this test.
  needs: ['model:project-category', 'model:organization', 
          'model:organization-membership', 'model:user', 
          'model:task', 'model:project-skill']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.subject();
  let attributes = Object.keys(model.toJSON());
  let attributesToTest = [
    "base64IconData",
    "closedTasksCount",
    "description",
    "iconLargeUrl",
    "iconThumbUrl",
    "longDescriptionBody",
    "longDescriptionMarkdown",
    "openTasksCount",
    "organization",
    "slug",
    "title",
  ];

  assert.hasAttributes(attributes, attributesToTest);
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

test('it should have the correct alias from organization-membership', function(assert) {
  assert.expect(2);

  let _this = this,
      project;

  Ember.run(function(){
    let organization = _this.store().createRecord('organization');
    _this.store().createRecord('organization-membership', { organization: organization, role: 'pending'});

    project = _this.subject({ organization: organization });
  });

  assert.equal(project.get('pendingMembersCount'), 1, 'pendingMembersCount should return 1');
  assert.equal(project.get('hasPendingMembers'), true, 'hasPendingMembers should return true');
});
